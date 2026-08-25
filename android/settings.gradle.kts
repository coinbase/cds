pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "cds-android"

// The Gradle root lives here, but the modules live where Nx expects them: libraries under
// `packages/`, applications under `apps/`. `projectDir` bridges the two layouts, so one Gradle
// build spans both folders and Android Studio shows them as ordinary modules.
include(":cds")
project(":cds").projectDir = file("../packages/cds-android")

include(":app")
project(":app").projectDir = file("../apps/android-app")
