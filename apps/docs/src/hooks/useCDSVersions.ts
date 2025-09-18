import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** Returns the CDS package versions which are defined in the docusaurus.config.ts file. */
export const useCDSVersions = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    cdsCommonVersion,
    cdsIconsVersion,
    cdsIllustrationsVersion,
    cdsMobileVisualizationVersion,
    cdsWebVisualizationVersion,
  } = siteConfig.customFields ?? {};

  if (typeof cdsCommonVersion !== 'string')
    throw Error(
      'The "cdsCommonVersion" string is not defined in docusaurus.config.ts "customFields"',
    );
  if (typeof cdsIconsVersion !== 'string')
    throw Error(
      'The "cdsIconsVersion" string is not defined in docusaurus.config.ts "customFields"',
    );
  if (typeof cdsIllustrationsVersion !== 'string')
    throw Error(
      'The "cdsIllustrationsVersion" string is not defined in docusaurus.config.ts "customFields"',
    );
  if (typeof cdsMobileVisualizationVersion !== 'string')
    throw Error(
      'The "cdsMobileVisualizationVersion" string is not defined in docusaurus.config.ts "customFields"',
    );
  if (typeof cdsWebVisualizationVersion !== 'string')
    throw Error(
      'The "cdsWebVisualizationVersion" string is not defined in docusaurus.config.ts "customFields"',
    );

  return {
    cdsCommonVersion,
    cdsIconsVersion,
    cdsIllustrationsVersion,
    cdsMobileVisualizationVersion,
    cdsWebVisualizationVersion,
  };
};
