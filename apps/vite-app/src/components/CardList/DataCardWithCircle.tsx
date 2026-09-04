import { upsellCardDefaultWidth } from '@coinbase/cds-common/tokens/card';
import { Button } from '@coinbase/cds-web/buttons';
import { Card, CardBody, CardFooter } from '@coinbase/cds-web/cards';
import { Icon } from '@coinbase/cds-web/icons';
import { Text } from '@coinbase/cds-web/typography';
import { ProgressCircle } from '@coinbase/cds-web/visualizations';

export const DataCardWithCircle = () => {
  const progress = 0.65;
  return (
    <Card width={upsellCardDefaultWidth}>
      <CardBody
        description="Earn $40 more by learning about new assets"
        media={
          <ProgressCircle
            contentNode={<Text font="title4">{progress * 100}%</Text>}
            progress={progress}
            size={100}
          />
        }
        paddingX={2}
        title="Crypto earned"
      />
      <CardFooter paddingX={2}>
        <Button compact end={<Icon color="fg" name="caretRight" size="s" />} variant="secondary">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};
