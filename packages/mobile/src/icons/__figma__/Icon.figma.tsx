import React from 'react';
import { figma } from '@figma/code-connect';

import { Icon } from '../Icon';

const props = {
  size: figma.enum('size', {
    'xs (12)': 'xs',
    's (16)': 's',
    'm (24)': 'm',
    'l (32)': 'l',
  }),
};

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11570', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step9" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11583', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step8" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11596', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step7" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11609', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step6" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11622', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step5" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11635', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step4" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11648', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step3" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11661', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step2" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11674', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step1" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11687', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="step0" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11700', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="wallet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11713', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="transactions" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11726', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="taxesReceipt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11739', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="taxesReceipt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11752', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="safe" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11765', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="percentage" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11778', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="payouts" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11791', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pay" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11804', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="giftCard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11817', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="directDepositIcon" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11830', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="directDepositIcon" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11843', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cash" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11856', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="card" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11869', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="calculator" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11882', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bank" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11895', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="taxes" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11908', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="paymentCard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11921', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pay" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11934', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="interest" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11947', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="directDeposit" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11960', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cash" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11973', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="currencies" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11986', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashVietnameseDong" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-11999', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashUSD" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12012', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashUaeDirham" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12025', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashTurkishLira" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12038', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashThaiBaht" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12051', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashSwissFranc" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12064', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashSingaporeDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12077', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashRupee" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12090', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashPolishZloty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12103', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashPhilippinePeso" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12116', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashJPY" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12129', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashIndonesianRupiah" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12142', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashGBP" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12155', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashEUR" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12168', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashCoins" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12181', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashCanadianDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12194', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashBrazilianReal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12207', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashBrazillianReal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12220', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cashAustralianDollar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12233', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="withdraw" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12246', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="wireTransfer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12259', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="upload" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12272', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="upArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12285', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="undo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12298', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sortUpCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12311', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="sortUpCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12324', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sortUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12337', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sortDownCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12350', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="sortDownCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12363', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sortDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12376', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sortDoubleArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12389', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="share" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12402', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="refresh" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12415', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="recurring" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12428', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="reCenter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12441', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="logout" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12454', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="login" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12467', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="initiator" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12480', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="forwardArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12493', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="fork" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12506', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="externalLink" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12519', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="expandAll" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12532', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="expandAddress" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12545', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="expand" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12558', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="download" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12571', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="downArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12584', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="doubleChevronRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12597', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="diagonalUpArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12610', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="diagonalRightArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12623', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="diagonalDownArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12636', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="deposit" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12649', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="convert" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12662', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="collapse" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12675', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="caretUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12688', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="caretRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12701', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="caretLeft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12714', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="caretDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12727', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="backArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12740', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12753', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowsVertical" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12766', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowsHorizontal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12779', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowRight" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12792', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowLeft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12805', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="arrowDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12818', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="allTimeHigh" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12831', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sendReceive" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12844', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rollingSpot" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12857', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gab" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12870', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="eventContracts" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12883', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="caret" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12896', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="smartContract" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12909', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pFPS" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12922', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="passport" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12935', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="orderHistory" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12948', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="orderBook" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12961', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="newsletter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12974', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="identityCard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-12987', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="fingerprint" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13000', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="faceScan" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13013', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="document" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13026', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="copy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13039', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="clipboard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13052', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="book" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13065', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="blog" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13078', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="advancedMarketSelector" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13091', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="orderBook" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13104', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="invoice" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13117', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="folderOpen" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13130', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="folderArrow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13143', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="folder" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13156', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="documentation" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13169', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="application" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13182', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="wrapToken" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13195', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="ultility" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13208', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="stake" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13221', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rocket" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13234', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="perpetualSwap" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13247', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nftSale" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13260', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="nftSale" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13273', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nftOffer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13286', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="nftOffer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13299', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nftBuy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13312', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="nftBuy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13325', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nft" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13338', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="metaverse" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13351', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="faucet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13364', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="faucet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13377', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="ethereum" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13390', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="drops" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13403', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="drops" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13416', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="diamond" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13429', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="diamond" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13442', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="dex" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13455', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="defi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13468', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cryptobasics" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13481', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="collectibles" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13494', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bridging" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13507', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="blockchain" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13520', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="api" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13533', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="airdrop" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13546', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="wallet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13559', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="staking" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13572', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="perpetualSwap" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13585', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gasFees" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13598', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="faucet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13611', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="drops" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13624', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="diamond" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13637', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="derivatives" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13650', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="defi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13663', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="collection" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13676', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cluster" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13689', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="apiPlug" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13702', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="verticalLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13715', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="unknown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13728', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="statusDot" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13741', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="staggeredList" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13754', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="setPinCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13767', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rectangle" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13780', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="qrCodeAlt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13793', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="qrCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13806', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="more" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13819', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="generalCharacter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13832', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="fib" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13845', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="exclamationMark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13858', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="drag" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13871', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="closeCaption" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13884', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="average" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13897', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="scanQrCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13910', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="qrCode" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13923', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="moreVertical" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13936', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="appSwitcher" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13949', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="verifiedBadge" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13962', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gitHubLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13975', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="googleLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-13988', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="twitterLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14001', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="thumbsUpOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14014', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="thumbsUp" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14027', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="thumbsDownOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14040', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="thumbsDown" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14053', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sofort" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14066', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="seen" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14079', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="paypal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14092', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="newsFeed" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14105', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="instagramLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14118', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="image" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14131', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="ideal" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14144', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="heart" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14157', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="heart" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14170', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gif" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14183', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="ghost" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14196', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="ghost" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14209', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="followAdd" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14222', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="following" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14235', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="flame" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14248', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="discordLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14261', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="comment" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14274', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="comment" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14287', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chatBubble" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14300', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chatBotAgent" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14313', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="annotation" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14326', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="affiliates" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14339', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="heart" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14352', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="ghost" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14365', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="faces" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14378', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="comment" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14391', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pulse" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14404', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="marketCap" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14417', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="lineChartCrypto" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14430', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="horizontalLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14443', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeMedium" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14456', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeLow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14469', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeEmpty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14482', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gauge" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14495', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="crossTrade" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14508', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="continuous" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14521', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="circulatingSupply" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14534', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartVolume" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14547', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartPieCircle" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14560', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartPie" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14573', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartLine" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14586', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartCandles" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14599', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartBar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14612', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="candlesticks" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14625', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="barChartWindow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14638', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="trading" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14651', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="regulatedFutures" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14664', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="options" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14677', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeMedium" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14690', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeLow" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14703', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeHigh" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14716', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gaugeEmpty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14729', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartPie" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14742', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartCandles" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14755', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chartBar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14768', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="activity" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14781', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="trophy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14794', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="telephone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14807', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="star" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14820', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="star" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14833', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sparkle" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14846', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="royalty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14859', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="royalty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14872', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="report" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14885', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="report" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14898', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="regulated" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14911', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pyramid" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14924', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="phone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14937', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="megaphone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14950', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="lightningBolt" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14963', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="lightbulb" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14976', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="laptop" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-14989', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="keyboard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15002', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="institute" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15015', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="giftBox" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15028', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gavel" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15041', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="games" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15054', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="camera" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15067', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="briefcase" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15080', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bellPlus" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15093', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bellCheck" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15106', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="artwork" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15119', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="trophyCup" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15132', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="tag" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15145', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="sun" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15158', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="securityShield" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15171', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="securityKey" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15184', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="royalty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15197', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="priceAlertsCheck" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15210', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="priceAlerts" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15223', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="moon" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15236', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="light" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15249', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="key" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15262', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="globe" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15275', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="giftBox" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15288', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="crystalBall" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15301', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="compass" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15314', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cloud" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15327', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="astronautHelmet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15340', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbaseOne" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15353', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="walletProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15366', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="base" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15379', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="waasProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15392', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="verifiedPools" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15405', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="venturesProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15418', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="signinProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15432', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rosettaProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15445', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rewardsProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15458', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="queryTransact" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15471', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="proProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15484', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="privateClientProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15497', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="primePoduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15510', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="payProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15523', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="participateProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15536', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="participate" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15549', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nodeProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15562', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="nftProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15575', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="learningRewardsProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15588', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="institutionalProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15601', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="exchangeProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15614', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="earnProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15627', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="earn" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15640', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="developerPlatformProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15653', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="developerAPIProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15666', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="derivativesProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15679', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="delegateProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15692', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="dataMarketplaceProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15705', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="custodyProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15718', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="complianceProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15731', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="commerceProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15744', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbaseOneLogo" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15757', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbaseCardProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15770', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbase" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15783', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="cloudProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15796', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="borrowProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15810', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="base" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15823', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="assetManagementProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15836', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="assetHubProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15849', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="advancedTradeProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15862', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="wifi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15875', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="warning" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15888', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="invisible" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15901', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="visible" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15914', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="visible" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15927', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="unlock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15940', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="trashCan" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15953', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="speaker" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15966', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="soundOn" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15979', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="soundOff" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-15992', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="shieldOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16005', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="shield" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16018', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="search" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16031', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="save" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16044', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rocket" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16057', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="questionMark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16070', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="protection" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16083', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="profile" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16096', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="play" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16109', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pin" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16122', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pencil" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16135', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pause" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16148', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="paperclip" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16161', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="paperAirplane" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16174', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="outline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16187', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="noWifi" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16200', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="music" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16213', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="minus" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16226', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="microphone" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16239', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="lock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16252', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="list" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16265', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="info" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16278', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="info" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16291', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="home" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16305', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="globe" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16318', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="gear" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16331', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="filter" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16344', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="error" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16357', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="email" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16370', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="dot" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16383', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="close" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16396', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="clockOutline" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16409', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="clock" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16422', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="circleCross" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16435', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="circleCheckmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16448', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="checkmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16461', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="checkboxEmpty" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16474', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="checkboxChecked" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16487', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="chainLink" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16500', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="calendar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16513', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bookmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16526', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="bookmark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16539', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bell" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16552', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="bell" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16565', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="avatar" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16578', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="add" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16591', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="shoppingCart" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16604', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="settings" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16617', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="rocketShip" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16630', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="pencil" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16643', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="newsFeed" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16656', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="menu" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16669', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="magnifyingGlass" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16682', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="home" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16695', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="hiddenEye" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16708', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="helpCenterQuestionMark" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16721', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="eye" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16734', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="dashboard" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16747', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="copy" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16760', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="browser" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16773', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="bell" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16786', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="addPeople" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16799', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="account" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16812', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="hammer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16825', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="hammer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16838', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="hammer" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16851', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="hamburger" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16864', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="peopleGroup" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16877', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="group" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16890', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="support" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16903', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="helpCenterProduct" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16916', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="support" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16929', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="crypto" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16942', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="planet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16955', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="planet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=29452-16968', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon active name="planet" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=30735%3A2', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="socialChat" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=30735%3A15', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="mint" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=30735%3A66', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="socialShare" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=30735%3A92', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="socialReshare" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=33183%3A8983', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="derivativesProductNew" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=42385%3A43970', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbaseRewards" {...props} />,
});

figma.connect(Icon, 'https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=42385%3A44010', {
  imports: ["import { Icon } from '@coinbase/cds-mobile/icons/Icon'"],
  props,
  example: (props) => <Icon name="coinbaseOneCard" {...props} />,
});
