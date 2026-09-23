import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinVersion

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
    `maven-publish`
}

android {
    namespace = "com.coinbase.cds"
    // Deliberately not the newest SDK available. AGP records this in the AAR metadata and
    // hard-fails any consumer compiling against a lower API, so every bump here forces a bump in
    // every consuming app. Raise it only when something in :cds actually needs it.
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        // A floor, and floors can't be raised without a major version bump. 26 covers every
        // Android version still receiving Play Services updates.
        minSdk = 26
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    buildFeatures {
        compose = true
    }
    testOptions {
        unitTests {
            // Compose's composer wraps every composition in `android.os.Trace` sections, and the
            // stub android.jar these tests compile against throws from every method rather than
            // no-opping. Tracing is the only Android surface the token layer reaches, so letting
            // the stubs return defaults is enough to run it on the JVM -- no Robolectric needed.
            isReturnDefaultValues = true
        }
    }
    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

kotlin {
    // Errors on any declaration that is public by default rather than by decision, and on any
    // public declaration with an inferred return type. :cds is a library, so its public surface is
    // a promise to consumers -- this makes adding to that promise a deliberate act.
    explicitApi()

    compilerOptions {
        // Stated rather than inherited from AGP's alignment with `compileOptions` above, so the
        // bytecode level :cds publishes is a decision recorded here and not a side effect.
        jvmTarget.set(JvmTarget.JVM_11)
        // Metadata a Kotlin 2.2 compiler emits is unreadable to older compilers, which would lock
        // consumers to our toolchain for no benefit. Pinning both to the oldest version :cds needs
        // keeps the published metadata readable further back than the compiler building it.
        apiVersion.set(KotlinVersion.KOTLIN_2_0)
        languageVersion.set(KotlinVersion.KOTLIN_2_0)
    }
}

publishing {
    publications {
        // One artifact, not a BOM plus per-subsystem modules: `LocalCdsTheme` then exists in
        // exactly one place on any consumer's classpath, which rules out the whole category of
        // theme-propagation bugs that two copies of a CompositionLocal produce. Splitting later is
        // straightforward; consolidating after consumers depend on separate coordinates is not.
        register<MavenPublication>("release") {
            groupId = "com.coinbase.cds"
            artifactId = "cds"
            version = "0.0.1"
            afterEvaluate { from(components["release"]) }
        }
    }
}

dependencies {
    // `api`, not `implementation`: :cds's public surface hands back Compose types -- Modifier,
    // Color, TextStyle -- so consumers can't call these components without those types on their
    // own compile classpath.
    //
    // Because these are `api`, the BOM version below is also the minimum a consumer can resolve
    // to. Resolving lower than :cds was compiled against fails at link time, confusingly.
    api(platform(libs.androidx.compose.bom))
    api(libs.androidx.compose.runtime)
    api(libs.androidx.compose.foundation)
    api(libs.androidx.compose.ui)
    api(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.animation.core)

    // JUnit alone. Theme behavior -- inheritance through nested providers, scheme inversion --
    // exists only inside a composition, but nothing about it needs Android or a UI tree, so the
    // tests host a composition on `androidx.compose.runtime` directly rather than pulling in
    // Robolectric and the UI-test artifacts. See `HeadlessComposition.kt`.
    testImplementation(libs.junit)
}
