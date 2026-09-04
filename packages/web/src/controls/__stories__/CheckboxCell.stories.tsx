import { type ReactNode, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons';
import { Switch } from '@coinbase/cds-web/controls';

import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { CheckboxCell } from '../CheckboxCell';

export default {
  title: 'Components/CheckboxCell',
  component: CheckboxCell,
};

const Example = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {children}
    </VStack>
  );
};

const Default = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckboxCell
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      title="Default Checkbox Cell"
      value="default"
    />
  );
};

const WithDescription = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckboxCell
      checked={checked}
      description="This is a helpful description that provides additional context"
      onChange={(e) => setChecked(e.target.checked)}
      title="Checkbox with Description with Description with Description"
      value="with-description"
    />
  );
};

const CustomIds = () => {
  const [checked, setChecked] = useState(false);

  return (
    <VStack gap={4}>
      <Text font="headline">Custom ID Examples</Text>
      <Text color="fgMuted" font="body">
        These examples show how to pass custom titleId and descriptionId props.
      </Text>

      <CheckboxCell
        checked={checked}
        description="This has custom IDs for testing or external references"
        descriptionId="custom-checkbox-description"
        onChange={(e) => setChecked(e.target.checked)}
        title="Custom IDs Example"
        titleId="custom-checkbox-title"
        value="custom-ids"
      />

      <Text color="fgMuted" font="caption">
        Title ID: custom-checkbox-title, Description ID: custom-checkbox-description
      </Text>
    </VStack>
  );
};

const CustomContent = () => {
  const [preferences, setPreferences] = useState({
    notifications: false,
    marketing: false,
  });

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof preferences;
    const value = event.target.checked;
    setPreferences((prev) => ({
      ...prev,
      [key]: !!value,
    }));
  };

  return (
    <VStack gap={4}>
      <Text font="headline">Custom React Node Content</Text>
      <Text color="fgMuted" font="body">
        These examples show custom title and description nodes with IDs applied correctly.
      </Text>

      <CheckboxCell
        checked={preferences.notifications}
        description={
          <VStack gap={1} id="notifications-desc">
            <Text color="fgMuted" font="body">
              Stay updated with important information
            </Text>
            <Text color="fgPrimary" font="label1">
              • Security alerts
            </Text>
            <Text color="fgPrimary" font="label1">
              • Account updates
            </Text>
            <Text color="fgPrimary" font="label1">
              • System notifications
            </Text>
          </VStack>
        }
        descriptionId="notifications-desc"
        onChange={handleToggle}
        title={
          <VStack gap={0} id="notifications-title">
            <Text font="headline">Email Notifications</Text>
            <Text color="fgPositive" font="caption">
              Recommended
            </Text>
          </VStack>
        }
        titleId="notifications-title"
        value="notifications"
      />

      <CheckboxCell
        checked={preferences.marketing}
        description={
          <VStack gap={1} id="marketing-desc">
            <Text color="fgMuted" font="body">
              Receive updates about new features and offers
            </Text>
            <Text color="fgWarning" font="caption">
              Optional - you can unsubscribe anytime
            </Text>
          </VStack>
        }
        descriptionId="marketing-desc"
        onChange={handleToggle}
        title={
          <Text font="headline" id="marketing-title">
            Marketing Communications{' '}
            <Text as="span" color="fgMuted" font="caption">
              (Optional)
            </Text>
          </Text>
        }
        titleId="marketing-title"
        value="marketing"
      />
    </VStack>
  );
};

const LongContent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <VStack gap={4}>
      <CheckboxCell
        checked={checked}
        description="This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the checkbox aligned at the top."
        onChange={(e) => setChecked(e.target.checked)}
        title="Very Long Title That Demonstrates Text Wrapping Behavior"
        value="long-content"
      />
    </VStack>
  );
};

const States = () => {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [disabledUnchecked, setDisabledUnchecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(true);

  return (
    <VStack gap={4}>
      <CheckboxCell
        checked={unchecked}
        description="This option is currently unchecked"
        onChange={(e) => setUnchecked(e.target.checked)}
        title="Unchecked State"
        value="unchecked"
      />

      <CheckboxCell
        checked={checked}
        description="This option is currently checked"
        onChange={(e) => setChecked(e.target.checked)}
        title="Checked State"
        value="checked"
      />

      <CheckboxCell
        disabled
        checked={disabledUnchecked}
        description="This option is disabled and unchecked"
        onChange={(e) => setDisabledUnchecked(e.target.checked)}
        title="Disabled Unchecked"
        value="disabled-unchecked"
      />

      <CheckboxCell
        disabled
        checked={disabledChecked}
        description="This option is disabled and checked"
        onChange={(e) => setDisabledChecked(e.target.checked)}
        title="Disabled Checked"
        value="disabled-checked"
      />
    </VStack>
  );
};

const PaddingVariations = () => {
  const [selected, setSelected] = useState<string>('padding-2');

  return (
    <VStack gap={4}>
      <CheckboxCell
        checked={selected === 'padding-1'}
        description="Small padding"
        onChange={(e) => setSelected(e.target.checked ? 'padding-1' : '')}
        padding={1}
        title="Padding: 1"
        value="padding-1"
      />

      <CheckboxCell
        checked={selected === 'padding-2'}
        description="Default padding"
        onChange={(e) => setSelected(e.target.checked ? 'padding-2' : '')}
        padding={2}
        title="Padding: 2 (Default)"
        value="padding-2"
      />

      <CheckboxCell
        checked={selected === 'padding-3'}
        description="Large padding"
        onChange={(e) => setSelected(e.target.checked ? 'padding-3' : '')}
        padding={3}
        title="Padding: 3"
        value="padding-3"
      />

      <CheckboxCell
        checked={selected === 'padding-4'}
        description="Extra large padding"
        onChange={(e) => setSelected(e.target.checked ? 'padding-4' : '')}
        padding={4}
        title="Padding: 4"
        value="padding-4"
      />
    </VStack>
  );
};

const BorderVariations = () => {
  const [selected, setSelected] = useState<string>('border-100');

  return (
    <VStack gap={4}>
      <CheckboxCell
        borderWidth={0}
        checked={selected === 'border-0'}
        description="No border"
        onChange={(e) => setSelected(e.target.checked ? 'border-0' : '')}
        title="Border Width: 0"
        value="border-0"
      />

      <CheckboxCell
        borderWidth={100}
        checked={selected === 'border-100'}
        description="Thin border (default)"
        onChange={(e) => setSelected(e.target.checked ? 'border-100' : '')}
        title="Border Width: 100"
        value="border-100"
      />

      <CheckboxCell
        borderWidth={200}
        checked={selected === 'border-200'}
        description="Medium border"
        onChange={(e) => setSelected(e.target.checked ? 'border-200' : '')}
        title="Border Width: 200"
        value="border-200"
      />

      <CheckboxCell
        borderWidth={300}
        checked={selected === 'border-300'}
        description="Thick border"
        onChange={(e) => setSelected(e.target.checked ? 'border-300' : '')}
        title="Border Width: 300"
        value="border-300"
      />
    </VStack>
  );
};

const BorderRadiusVariations = () => {
  const [selected, setSelected] = useState<string>('radius-200');

  return (
    <VStack gap={4}>
      <CheckboxCell
        borderRadius={0}
        checked={selected === 'radius-0'}
        description="No border radius (square corners)"
        onChange={(e) => setSelected(e.target.checked ? 'radius-0' : '')}
        title="Border Radius: 0"
        value="radius-0"
      />

      <CheckboxCell
        borderRadius={100}
        checked={selected === 'radius-100'}
        description="Small border radius"
        onChange={(e) => setSelected(e.target.checked ? 'radius-100' : '')}
        title="Border Radius: 100"
        value="radius-100"
      />

      <CheckboxCell
        borderRadius={200}
        checked={selected === 'radius-200'}
        description="Default border radius"
        onChange={(e) => setSelected(e.target.checked ? 'radius-200' : '')}
        title="Border Radius: 200 (Default)"
        value="radius-200"
      />

      <CheckboxCell
        borderRadius={400}
        checked={selected === 'radius-400'}
        description="Large border radius"
        onChange={(e) => setSelected(e.target.checked ? 'radius-400' : '')}
        title="Border Radius: 400"
        value="radius-400"
      />

      <CheckboxCell
        borderRadius={800}
        checked={selected === 'radius-800'}
        description="Very large border radius"
        onChange={(e) => setSelected(e.target.checked ? 'radius-800' : '')}
        title="Border Radius: 800"
        value="radius-800"
      />
    </VStack>
  );
};

const InteractiveDemo = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hasDescription, setHasDescription] = useState(true);

  return (
    <VStack gap={4}>
      <Text font="headline">Interactive Demo</Text>
      <Text color="fgMuted" font="body">
        Use the controls below to see how different props affect the CheckboxCell component.
      </Text>

      <VStack gap={2}>
        <Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)}>
          Disabled
        </Switch>

        <Switch checked={hasDescription} onChange={(e) => setHasDescription(e.target.checked)}>
          Show Description
        </Switch>
      </VStack>

      <CheckboxCell
        checked={checked}
        description={hasDescription ? 'This description can be toggled on and off' : undefined}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
        title="Interactive Checkbox Cell"
        value="demo"
      />
    </VStack>
  );
};

const CheckboxGroup = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof preferences;
    const value = event.target.checked;
    setPreferences((prev) => ({
      ...prev,
      [key]: !!value,
    }));
  };

  return (
    <VStack gap={3}>
      <Text font="headline">Privacy Preferences</Text>
      <Text color="fgMuted" font="body">
        Choose which types of data you&apos;re comfortable sharing with us.
      </Text>

      <VStack gap={2}>
        <CheckboxCell
          checked={preferences.notifications}
          description="Receive email notifications about important updates"
          onChange={handleToggle}
          title="Email Notifications"
          value="notifications"
        />

        <CheckboxCell
          checked={preferences.marketing}
          description="Receive promotional emails and product updates"
          onChange={handleToggle}
          title="Marketing Communications"
          value="marketing"
        />

        <CheckboxCell
          checked={preferences.analytics}
          description="Help us improve by sharing anonymous usage data"
          onChange={handleToggle}
          title="Analytics & Performance"
          value="analytics"
        />
      </VStack>

      <Text color="fgMuted" font="caption">
        You can change these preferences at any time in your account settings.
      </Text>
    </VStack>
  );
};

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoSave: true,
    notifications: true,
    betaFeatures: false,
  });
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof settings;
    const value = event.target.checked;
    setSettings((prev) => ({
      ...prev,
      [key]: !!value,
    }));
  };

  return (
    <VStack gap={6}>
      <Text font="headline">Application Settings</Text>

      <VStack gap={3}>
        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            APPEARANCE
          </Text>
          <CheckboxCell
            checked={settings.darkMode}
            description="Use dark theme for the interface"
            onChange={handleToggle}
            title="Dark Mode"
            value="dark-mode"
          />
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            BEHAVIOR
          </Text>
          <VStack gap={1}>
            <CheckboxCell
              checked={settings.autoSave}
              description="Automatically save your work every few minutes"
              onChange={handleToggle}
              title="Auto-save"
              value="auto-save"
            />

            <CheckboxCell
              checked={settings.notifications}
              description="Show desktop notifications for important events"
              onChange={handleToggle}
              title="Desktop Notifications"
              value="notifications"
            />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            EXPERIMENTAL
          </Text>
          <CheckboxCell
            checked={settings.betaFeatures}
            description="Enable experimental features (may be unstable)"
            onChange={handleToggle}
            title="Beta Features"
            value="beta-features"
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

const OnboardingFlow = () => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleToggle =
    (key: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAgreements((prev) => ({
        ...prev,
        [key]: e.target.checked,
      }));
    };

  const allRequiredAccepted = agreements.terms && agreements.privacy;

  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Text font="headline">Welcome to Our Platform</Text>
        <Text color="fgMuted" font="body">
          Before we get started, please review and accept our terms.
        </Text>
      </VStack>

      <VStack gap={2}>
        <CheckboxCell
          checked={agreements.terms}
          description="I agree to the Terms of Service and understand my rights and obligations"
          onChange={handleToggle('terms')}
          title="Terms of Service (Required)"
          value="terms"
        />

        <CheckboxCell
          checked={agreements.privacy}
          description="I acknowledge that I have read and understood the Privacy Policy"
          onChange={handleToggle('privacy')}
          title="Privacy Policy (Required)"
          value="privacy"
        />

        <CheckboxCell
          checked={agreements.marketing}
          description="I would like to receive marketing communications and product updates"
          onChange={handleToggle('marketing')}
          title="Marketing Communications (Optional)"
          value="marketing"
        />
      </VStack>

      <Button block disabled={!allRequiredAccepted}>
        Continue
      </Button>

      {!allRequiredAccepted && (
        <Text color="fgMuted" font="caption">
          Please accept the required terms to continue.
        </Text>
      )}
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={4}>
      <Example title="Default">
        <Default />
      </Example>
      <Example title="With Description">
        <WithDescription />
      </Example>
      <Example title="Custom IDs">
        <CustomIds />
      </Example>
      <Example title="Custom Content">
        <CustomContent />
      </Example>
      <Example title="Long Content">
        <LongContent />
      </Example>
      <Example title="States">
        <States />
      </Example>
      <Example title="Padding Variations">
        <PaddingVariations />
      </Example>
      <Example title="Border Variations">
        <BorderVariations />
      </Example>
      <Example title="Border Radius Variations">
        <BorderRadiusVariations />
      </Example>
      <Example title="Interactive Demo">
        <InteractiveDemo />
      </Example>
      <Example title="Checkbox Group">
        <CheckboxGroup />
      </Example>
      <Example title="Settings Panel">
        <SettingsPanel />
      </Example>
      <Example title="Onboarding Flow">
        <OnboardingFlow />
      </Example>
    </VStack>
  );
};
