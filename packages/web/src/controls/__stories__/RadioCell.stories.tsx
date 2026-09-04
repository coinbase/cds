import { type ReactNode, useState } from 'react';
import { Switch } from '@coinbase/cds-web/controls';

import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { RadioCell } from '../RadioCell';

export default {
  title: 'Components/RadioCell',
  component: RadioCell,
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
  const [selected, setSelected] = useState<string>('');

  return (
    <RadioCell
      checked={selected === 'default'}
      onChange={(e) => setSelected(e.target.value)}
      title="Default Radio Cell"
      value="default"
    />
  );
};

const WithDescription = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <RadioCell
      checked={selected === 'with-description'}
      description="This is a helpful description that provides additional context"
      onChange={(e) => setSelected(e.target.value)}
      title="Radio with Description"
      value="with-description"
    />
  );
};

const CustomIds = () => {
  const [selected, setSelected] = useState<string>('option-with-ids');

  return (
    <VStack gap={4}>
      <Text font="headline">Custom ID Examples</Text>
      <Text color="fgMuted" font="body">
        These examples show how to pass custom titleId and descriptionId props.
      </Text>

      <VStack gap={2}>
        <RadioCell
          checked={selected === 'option-with-ids'}
          description="This option has custom IDs for testing or external references"
          descriptionId="payment-credit-description"
          onChange={(e) => setSelected(e.target.value)}
          title="Credit Card Payment"
          titleId="payment-credit-title"
          value="option-with-ids"
        />

        <RadioCell
          checked={selected === 'option-bank'}
          description="Bank transfer with predictable IDs for form validation"
          descriptionId="payment-bank-description"
          onChange={(e) => setSelected(e.target.value)}
          title="Bank Transfer"
          titleId="payment-bank-title"
          value="option-bank"
        />
      </VStack>

      <Text color="fgMuted" font="caption">
        Selected: {selected} | Custom IDs are applied to title and description elements
      </Text>
    </VStack>
  );
};

const CustomContent = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  return (
    <VStack gap={4}>
      <Text font="headline">Custom React Node Content</Text>
      <Text color="fgMuted" font="body">
        These examples show custom title and description nodes with IDs applied correctly.
      </Text>

      <VStack gap={2}>
        <RadioCell
          checked={selectedPlan === 'basic'}
          description={
            <VStack gap={1} id="plan-basic-desc">
              <Text color="fgMuted" font="body">
                Perfect for individuals getting started
              </Text>
              <Text font="label1">$9/month</Text>
              <Text color="fgMuted" font="caption">
                • Up to 5 projects
              </Text>
              <Text color="fgMuted" font="caption">
                • 1GB storage
              </Text>
              <Text color="fgMuted" font="caption">
                • Email support
              </Text>
            </VStack>
          }
          descriptionId="plan-basic-desc"
          onChange={(e) => setSelectedPlan(e.target.value)}
          title={
            <VStack gap={0} id="plan-basic-title">
              <Text font="headline">Basic Plan</Text>
              <Text color="fgMuted" font="caption">
                For individuals
              </Text>
            </VStack>
          }
          titleId="plan-basic-title"
          value="basic"
        />

        <RadioCell
          checked={selectedPlan === 'pro'}
          description={
            <VStack gap={1} id="plan-pro-desc">
              <Text color="fgMuted" font="body">
                Great for growing teams and businesses
              </Text>
              <Text font="label1">$29/month</Text>
              <Text color="fgPositive" font="caption">
                • Most Popular
              </Text>
              <Text color="fgMuted" font="caption">
                • Unlimited projects
              </Text>
              <Text color="fgMuted" font="caption">
                • 10GB storage
              </Text>
              <Text color="fgMuted" font="caption">
                • Priority support
              </Text>
            </VStack>
          }
          descriptionId="plan-pro-desc"
          onChange={(e) => setSelectedPlan(e.target.value)}
          title={
            <Text font="headline" id="plan-pro-title">
              Pro Plan{' '}
              <Text as="span" color="fgPositive" font="caption">
                • RECOMMENDED
              </Text>
            </Text>
          }
          titleId="plan-pro-title"
          value="pro"
        />

        <RadioCell
          checked={selectedPlan === 'enterprise'}
          description={
            <VStack gap={1} id="plan-enterprise-desc">
              <Text color="fgMuted" font="body">
                Advanced features for large organizations
              </Text>
              <Text font="label1">$99/month</Text>
              <Text color="fgMuted" font="caption">
                • Unlimited everything
              </Text>
              <Text color="fgMuted" font="caption">
                • Dedicated support
              </Text>
              <Text color="fgMuted" font="caption">
                • Custom integrations
              </Text>
            </VStack>
          }
          descriptionId="plan-enterprise-desc"
          onChange={(e) => setSelectedPlan(e.target.value)}
          title={
            <VStack gap={0} id="plan-enterprise-title">
              <Text font="headline">Enterprise Plan</Text>
              <Text color="fgMuted" font="caption">
                For organizations
              </Text>
            </VStack>
          }
          titleId="plan-enterprise-title"
          value="enterprise"
        />
      </VStack>
    </VStack>
  );
};

const LongContent = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <VStack gap={4}>
      <RadioCell
        checked={selected === 'long-content'}
        description="This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the radio button aligned at the top."
        onChange={(e) => setSelected(e.target.value)}
        title="Very Long Title That Demonstrates Text Wrapping Behavior in Radio Cells"
        value="long-content"
      />
    </VStack>
  );
};

const States = () => {
  const [selectedState, setSelectedState] = useState<string>('checked');

  return (
    <VStack gap={4}>
      <RadioCell
        checked={selectedState === 'unchecked'}
        description="This option is currently unchecked"
        onChange={(e) => setSelectedState(e.target.value)}
        title="Unchecked State"
        value="unchecked"
      />

      <RadioCell
        checked={selectedState === 'checked'}
        description="This option is currently checked"
        onChange={(e) => setSelectedState(e.target.value)}
        title="Checked State"
        value="checked"
      />

      <RadioCell
        disabled
        checked={false}
        description="This option is disabled and unchecked"
        onChange={(e) => {}}
        title="Disabled Unchecked"
        value="disabled-unchecked"
      />

      <RadioCell
        disabled
        checked={true}
        description="This option is disabled and checked"
        onChange={(e) => {}}
        title="Disabled Checked"
        value="disabled-checked"
      />
    </VStack>
  );
};

const BasicRadioGroup = () => {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const options = [
    { value: 'option1', title: 'Option 1', description: 'First choice available' },
    { value: 'option2', title: 'Option 2', description: 'Second choice available' },
    { value: 'option3', title: 'Option 3', description: 'Third choice available' },
  ];

  return (
    <VStack gap={2}>
      <Text font="headline">Choose one option:</Text>
      {options.map((option) => (
        <RadioCell
          key={option.value}
          checked={selectedOption === option.value}
          description={option.description}
          onChange={(e) => setSelectedOption(e.target.value)}
          title={option.title}
          value={option.value}
        />
      ))}
      <Text color="fgMuted" font="body">
        Selected: {selectedOption}
      </Text>
    </VStack>
  );
};

const GapVariations = () => {
  const [selected, setSelected] = useState<string>('gap-2');

  return (
    <VStack gap={4}>
      <Text font="headline">Gap Variations</Text>

      <RadioCell
        checked={selected === 'gap-1'}
        columnGap={1}
        description="Small gap between radio and content"
        onChange={(e) => setSelected(e.target.value)}
        title="Gap: 1"
        value="gap-1"
      />

      <RadioCell
        checked={selected === 'gap-2'}
        description="Default gap between radio and content"
        onChange={(e) => setSelected(e.target.value)}
        title="Gap: 2 (Default)"
        value="gap-2"
      />

      <RadioCell
        checked={selected === 'gap-3'}
        columnGap={3}
        description="Large gap between radio and content"
        onChange={(e) => setSelected(e.target.value)}
        title="Gap: 3"
        value="gap-3"
      />

      <RadioCell
        checked={selected === 'gap-4'}
        columnGap={4}
        description="Extra large gap between radio and content"
        onChange={(e) => setSelected(e.target.value)}
        title="Gap: 4"
        value="gap-4"
      />
    </VStack>
  );
};

const DirectionalGaps = () => {
  const [selected, setSelected] = useState<string>('default');

  return (
    <VStack gap={4}>
      <Text font="headline">Directional Gap Control</Text>

      <RadioCell
        checked={selected === 'default'}
        description="Default gaps"
        onChange={(e) => setSelected(e.target.value)}
        title="Default Gaps"
        value="default"
      />

      <RadioCell
        checked={selected === 'horizontal-large'}
        columnGap={4}
        description="Large horizontal gap, small vertical gap"
        onChange={(e) => setSelected(e.target.value)}
        rowGap={1}
        title="Large Horizontal Gap"
        value="horizontal-large"
      />

      <RadioCell
        checked={selected === 'vertical-large'}
        columnGap={1}
        description="Small horizontal gap, large vertical gap between title and description"
        onChange={(e) => setSelected(e.target.value)}
        rowGap={3}
        title="Large Vertical Gap"
        value="vertical-large"
      />

      <RadioCell
        checked={selected === 'no-gaps'}
        columnGap={0}
        description="No gaps for compact layout"
        onChange={(e) => setSelected(e.target.value)}
        rowGap={0}
        title="No Gaps"
        value="no-gaps"
      />
    </VStack>
  );
};

const PaddingVariations = () => {
  const [selected, setSelected] = useState<string>('padding-2');

  return (
    <VStack gap={4}>
      <RadioCell
        checked={selected === 'padding-1'}
        description="Small padding"
        onChange={(e) => setSelected(e.target.value)}
        padding={1}
        title="Padding: 1"
        value="padding-1"
      />

      <RadioCell
        checked={selected === 'padding-2'}
        description="Default padding"
        onChange={(e) => setSelected(e.target.value)}
        padding={2}
        title="Padding: 2 (Default)"
        value="padding-2"
      />

      <RadioCell
        checked={selected === 'padding-3'}
        description="Large padding"
        onChange={(e) => setSelected(e.target.value)}
        padding={3}
        title="Padding: 3"
        value="padding-3"
      />

      <RadioCell
        checked={selected === 'padding-4'}
        description="Extra large padding"
        onChange={(e) => setSelected(e.target.value)}
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
      <RadioCell
        borderWidth={0}
        checked={selected === 'border-0'}
        description="No border"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Width: 0"
        value="border-0"
      />

      <RadioCell
        borderWidth={100}
        checked={selected === 'border-100'}
        description="Thin border (default)"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Width: 100"
        value="border-100"
      />

      <RadioCell
        borderWidth={200}
        checked={selected === 'border-200'}
        description="Medium border"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Width: 200"
        value="border-200"
      />

      <RadioCell
        borderWidth={300}
        checked={selected === 'border-300'}
        description="Thick border"
        onChange={(e) => setSelected(e.target.value)}
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
      <RadioCell
        borderRadius={0}
        checked={selected === 'radius-0'}
        description="No border radius (square corners)"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Radius: 0"
        value="radius-0"
      />

      <RadioCell
        borderRadius={100}
        checked={selected === 'radius-100'}
        description="Small border radius"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Radius: 100"
        value="radius-100"
      />

      <RadioCell
        borderRadius={200}
        checked={selected === 'radius-200'}
        description="Default border radius"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Radius: 200 (Default)"
        value="radius-200"
      />

      <RadioCell
        borderRadius={400}
        checked={selected === 'radius-400'}
        description="Large border radius"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Radius: 400"
        value="radius-400"
      />

      <RadioCell
        borderRadius={800}
        checked={selected === 'radius-800'}
        description="Very large border radius"
        onChange={(e) => setSelected(e.target.value)}
        title="Border Radius: 800"
        value="radius-800"
      />
    </VStack>
  );
};

const InteractiveDemo = () => {
  const [selected, setSelected] = useState<string>('demo');
  const [disabled, setDisabled] = useState(false);
  const [hasDescription, setHasDescription] = useState(true);
  const [gapSize, setGapSize] = useState<string>('2');

  return (
    <VStack gap={4}>
      <Text font="headline">Interactive Demo</Text>
      <Text color="fgMuted" font="body">
        Use the controls below to see how different props affect the RadioCell component.
      </Text>

      <VStack gap={2}>
        <Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)}>
          Disabled
        </Switch>

        <Switch checked={hasDescription} onChange={(e) => setHasDescription(e.target.checked)}>
          Show Description
        </Switch>
      </VStack>

      <VStack gap={2}>
        <Text font="label1">Gap Size:</Text>
        {['1', '2', '3', '4'].map((gap) => (
          <RadioCell
            key={gap}
            checked={gapSize === gap}
            onChange={(e) => setGapSize(e.target.value)}
            title={`Gap: ${gap}`}
            value={gap}
          />
        ))}
      </VStack>

      <RadioCell
        checked={selected === 'demo'}
        description={hasDescription ? 'This description can be toggled on and off' : undefined}
        disabled={disabled}
        gap={parseInt(gapSize) as 1 | 2 | 3 | 4}
        onChange={(e) => setSelected(e.target.value)}
        title="Interactive Radio Cell"
        value="demo"
      />
    </VStack>
  );
};

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit-card');

  const paymentMethods = [
    {
      value: 'credit-card',
      title: 'Credit Card',
      description: 'Pay with Visa, Mastercard, or American Express',
    },
    {
      value: 'bank-transfer',
      title: 'Bank Transfer',
      description: 'Direct transfer from your bank account (2-3 business days)',
    },
    {
      value: 'digital-wallet',
      title: 'Digital Wallet',
      description: 'Pay with PayPal, Apple Pay, or Google Pay',
    },
    {
      value: 'crypto',
      title: 'Cryptocurrency',
      description: 'Pay with Bitcoin, Ethereum, or other supported cryptocurrencies',
    },
  ];

  return (
    <VStack gap={3}>
      <Text font="headline">Payment Method</Text>
      <Text color="fgMuted" font="body">
        Choose how you&apos;d like to pay for your order.
      </Text>

      <VStack gap={2}>
        {paymentMethods.map((method) => (
          <RadioCell
            key={method.value}
            checked={selectedMethod === method.value}
            description={method.description}
            onChange={(e) => setSelectedMethod(e.target.value)}
            title={method.title}
            value={method.value}
          />
        ))}
      </VStack>

      <Text color="fgMuted" font="caption">
        Selected payment method: {paymentMethods.find((m) => m.value === selectedMethod)?.title}
      </Text>
    </VStack>
  );
};

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  return (
    <VStack gap={4}>
      <VStack gap={2}>
        <Text font="headline">Choose Your Plan</Text>
        <Text color="fgMuted" font="body">
          Select the plan that best fits your needs. You can change or cancel anytime.
        </Text>
      </VStack>

      <VStack gap={2}>
        <RadioCell
          checked={selectedPlan === 'basic'}
          description={
            <VStack gap={1}>
              <Text color="fgMuted" font="body">
                Perfect for individuals getting started
              </Text>
              <Text font="label1">$9/month • Up to 5 projects • 1GB storage</Text>
            </VStack>
          }
          onChange={(e) => setSelectedPlan(e.target.value)}
          title="Basic Plan"
          value="basic"
        />

        <RadioCell
          checked={selectedPlan === 'pro'}
          description={
            <VStack gap={1}>
              <Text color="fgMuted" font="body">
                Great for growing teams and businesses
              </Text>
              <Text font="label1">$29/month • Unlimited projects • 10GB storage</Text>
              <Text color="fgPositive" font="caption">
                • Most Popular
              </Text>
            </VStack>
          }
          onChange={(e) => setSelectedPlan(e.target.value)}
          title="Pro Plan"
          value="pro"
        />

        <RadioCell
          checked={selectedPlan === 'enterprise'}
          description={
            <VStack gap={1}>
              <Text color="fgMuted" font="body">
                Advanced features for large organizations
              </Text>
              <Text font="label1">$99/month • Unlimited everything • Priority support</Text>
            </VStack>
          }
          onChange={(e) => setSelectedPlan(e.target.value)}
          title="Enterprise Plan"
          value="enterprise"
        />
      </VStack>
    </VStack>
  );
};

const AccountSettings = () => {
  const [theme, setTheme] = useState<string>('system');
  const [language, setLanguage] = useState<string>('english');
  const [timezone, setTimezone] = useState<string>('auto');

  return (
    <VStack gap={6}>
      <Text font="headline">Account Settings</Text>

      <VStack gap={3}>
        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            THEME PREFERENCE
          </Text>
          <VStack gap={1}>
            <RadioCell
              checked={theme === 'light'}
              description="Always use light theme"
              onChange={(e) => setTheme(e.target.value)}
              title="Light"
              value="light"
            />

            <RadioCell
              checked={theme === 'dark'}
              description="Always use dark theme"
              onChange={(e) => setTheme(e.target.value)}
              title="Dark"
              value="dark"
            />

            <RadioCell
              checked={theme === 'system'}
              description="Follow system preference"
              onChange={(e) => setTheme(e.target.value)}
              title="System"
              value="system"
            />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            LANGUAGE
          </Text>
          <VStack gap={1}>
            <RadioCell
              checked={language === 'english'}
              description="English (US)"
              onChange={(e) => setLanguage(e.target.value)}
              title="English"
              value="english"
            />

            <RadioCell
              checked={language === 'spanish'}
              description="Español"
              onChange={(e) => setLanguage(e.target.value)}
              title="Spanish"
              value="spanish"
            />

            <RadioCell
              checked={language === 'french'}
              description="Français"
              onChange={(e) => setLanguage(e.target.value)}
              title="French"
              value="french"
            />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            TIMEZONE
          </Text>
          <VStack gap={1}>
            <RadioCell
              checked={timezone === 'auto'}
              description="Automatically detect from browser"
              onChange={(e) => setTimezone(e.target.value)}
              title="Auto-detect"
              value="auto"
            />

            <RadioCell
              checked={timezone === 'pst'}
              description="Pacific Standard Time (UTC-8)"
              onChange={(e) => setTimezone(e.target.value)}
              title="PST"
              value="pst"
            />

            <RadioCell
              checked={timezone === 'est'}
              description="Eastern Standard Time (UTC-5)"
              onChange={(e) => setTimezone(e.target.value)}
              title="EST"
              value="est"
            />

            <RadioCell
              checked={timezone === 'utc'}
              description="Coordinated Universal Time (UTC+0)"
              onChange={(e) => setTimezone(e.target.value)}
              title="UTC"
              value="utc"
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

const SurveyForm = () => {
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Text font="headline">Customer Feedback Survey</Text>
        <Text color="fgMuted" font="body">
          Help us improve by sharing your experience with our product.
        </Text>
      </VStack>

      <VStack gap={3}>
        <VStack gap={2}>
          <Text font="label1">How satisfied are you with our product?</Text>
          <VStack gap={1}>
            {[
              {
                value: 'very-satisfied',
                title: 'Very Satisfied',
                description: 'Exceeds expectations',
              },
              { value: 'satisfied', title: 'Satisfied', description: 'Meets expectations' },
              {
                value: 'neutral',
                title: 'Neutral',
                description: 'Neither satisfied nor dissatisfied',
              },
              { value: 'dissatisfied', title: 'Dissatisfied', description: 'Below expectations' },
              {
                value: 'very-dissatisfied',
                title: 'Very Dissatisfied',
                description: 'Far below expectations',
              },
            ].map((option) => (
              <RadioCell
                key={option.value}
                checked={satisfaction === option.value}
                description={option.description}
                onChange={(e) => setSatisfaction(e.target.value)}
                title={option.title}
                value={option.value}
              />
            ))}
          </VStack>
        </VStack>

        <VStack gap={2}>
          <Text font="label1">How often do you use our product?</Text>
          <VStack gap={1}>
            {[
              { value: 'daily', title: 'Daily', description: 'Every day' },
              { value: 'weekly', title: 'Weekly', description: 'A few times per week' },
              { value: 'monthly', title: 'Monthly', description: 'A few times per month' },
              { value: 'rarely', title: 'Rarely', description: 'Once in a while' },
            ].map((option) => (
              <RadioCell
                key={option.value}
                checked={frequency === option.value}
                description={option.description}
                onChange={(e) => setFrequency(e.target.value)}
                title={option.title}
                value={option.value}
              />
            ))}
          </VStack>
        </VStack>

        <VStack gap={2}>
          <Text font="label1">Would you recommend us to a friend?</Text>
          <VStack gap={1}>
            {[
              {
                value: 'definitely',
                title: 'Definitely',
                description: 'I would actively recommend it',
              },
              { value: 'probably', title: 'Probably', description: 'I would likely recommend it' },
              { value: 'maybe', title: 'Maybe', description: 'I might recommend it' },
              {
                value: 'probably-not',
                title: 'Probably Not',
                description: 'I would hesitate to recommend it',
              },
              {
                value: 'definitely-not',
                title: 'Definitely Not',
                description: 'I would not recommend it',
              },
            ].map((option) => (
              <RadioCell
                key={option.value}
                checked={recommendation === option.value}
                description={option.description}
                onChange={(e) => setRecommendation(e.target.value)}
                title={option.title}
                value={option.value}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
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
      <Example title="Basic Radio Group">
        <BasicRadioGroup />
      </Example>
      <Example title="Gap Variations">
        <GapVariations />
      </Example>
      <Example title="Directional Gaps">
        <DirectionalGaps />
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
      <Example title="Payment Methods">
        <PaymentMethods />
      </Example>
      <Example title="Subscription Plans">
        <SubscriptionPlans />
      </Example>
      <Example title="Account Settings">
        <AccountSettings />
      </Example>
      <Example title="Survey Form">
        <SurveyForm />
      </Example>
    </VStack>
  );
};
