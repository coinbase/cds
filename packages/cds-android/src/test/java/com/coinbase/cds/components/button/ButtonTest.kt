package com.coinbase.cds.components.button

import androidx.compose.foundation.interaction.Interaction
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.ProgressBarRangeInfo
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsEnabled
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsThemeProvider
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(instrumentedPackages = ["androidx.loader.content"])
class ButtonTest {
    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun rendersLabelAndFiresOnClick() {
        var clicked = false
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(text = "Confirm", onClick = { clicked = true })
            }
        }

        composeRule.onNodeWithText("Confirm").assertIsDisplayed().performClick()
        assertTrue(clicked)
    }

    @Test
    fun disabledButtonDoesNotInvokeOnClick() {
        var clicked = false
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(text = "Disabled", onClick = { clicked = true }, enabled = false)
            }
        }

        composeRule.onNodeWithText("Disabled").assertIsNotEnabled()
        composeRule.onNodeWithText("Disabled").performClick()
        assertEquals(false, clicked)
    }

    @Test
    fun loadingButtonIsNotEnabledAndExposesProgressSemantics() {
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(text = "Submit", onClick = {}, loading = true)
            }
        }

        val node = composeRule.onNodeWithContentDescription("Submit")
        node.assertIsNotEnabled()
        node.fetchSemanticsNode().config.apply {
            assertEquals("Loading", get(SemanticsProperties.StateDescription))
            assertEquals(
                ProgressBarRangeInfo.Indeterminate,
                get(SemanticsProperties.ProgressBarRangeInfo),
            )
        }
    }

    @Test
    fun loadingButtonDoesNotInvokeOnClick() {
        var clicked = false
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(text = "Submit", onClick = { clicked = true }, loading = true)
            }
        }

        composeRule.onNodeWithContentDescription("Submit").performClick()
        assertEquals(false, clicked)
    }

    @Test
    fun hoistedInteractionSourceReceivesPressInteraction() {
        val interactionSource = MutableInteractionSource()
        val interactions = mutableListOf<Interaction>()

        composeRule.setContent {
            LaunchedEffect(interactionSource) {
                interactionSource.interactions.collect { interaction ->
                    interactions.add(interaction)
                }
            }
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(
                    text = "Confirm",
                    onClick = {},
                    interactionSource = interactionSource,
                )
            }
        }

        composeRule.onNodeWithText("Confirm").performClick()
        composeRule.waitForIdle()
        assertTrue(interactions.any { it is PressInteraction.Press })
    }

    @Test
    fun iconSlotsReceiveTintAndSize() {
        var capturedTint: Color? = null
        var capturedSize: Dp? = null
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(
                    text = "With icon",
                    onClick = {},
                    startIcon = { tint, size ->
                        capturedTint = tint
                        capturedSize = size
                    },
                )
            }
        }

        composeRule.waitForIdle()
        assertEquals(CdsDefaultTheme.lightColors.fgInverse, capturedTint)
        assertEquals(CdsDefaultTheme.iconSize.m, capturedSize)
    }

    @Test
    fun callerModifierFillMaxWidthIsRespected() {
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(
                    text = "Full width",
                    onClick = {},
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("button"),
                )
            }
        }

        composeRule.onNodeWithTag("button").assertIsDisplayed()
    }

    @Test
    fun enabledButtonIsClickable() {
        composeRule.setContent {
            CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
                Button(text = "Enabled", onClick = {})
            }
        }

        composeRule.onNodeWithText("Enabled").assertIsEnabled()
    }
}
