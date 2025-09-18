import ParentTypesList from '@theme/ParentTypesList';
import PropsTable from '@theme/PropsTable';
import { PropsTOCUpdater } from '@theme/PropsTOCManager';
import { sharedTypeAliases } from ':docgen/_types/sharedTypeAliases';
import { sharedParentTypes } from ':docgen/_types/sharedParentTypes';

import data from './data';

<ParentTypesList parentTypes={data.parentTypes} sharedTypeAliases={sharedTypeAliases} sharedParentTypes={sharedParentTypes} />

<PropsTable props={data.props} sharedTypeAliases={sharedTypeAliases}  />

<PropsTOCUpdater toc={require('./toc-props')} />