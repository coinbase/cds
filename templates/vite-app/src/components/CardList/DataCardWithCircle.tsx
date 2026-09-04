import { Button } from '@coinbase/cds-web/buttons';
import { Card, CardBody, CardFooter } from '@coinbase/cds-web/cards';
import { ProgressCircle } from '@coinbase/cds-web/visualizations';
import { Text } from '@coinbase/cds-web/typography';
import { upsellCardDefaultWidth } from '@coinbase/cds-common/tokens/card';
import { Icon } from '@coinbase/cds-web/icons';

export const DataCardWithCircle = () => {
  const progress = 0.65;
  return (
    <Card width={upsellCardDefaultWidth}>
      <CardBody
        paddingX={2}
        title="Crypto earned"
        description="Earn $40 more by learning about new assets"
        media={
          <ProgressCircle
            progress={progress}
            size={100}
            contentNode={<Text font="title4">{progress * 100}%</Text>}
          />
        }
      />
      <CardFooter paddingX={2}>
        <Button compact variant="secondary" end={<Icon name="caretRight" color="fg" size="s" />}>
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};
