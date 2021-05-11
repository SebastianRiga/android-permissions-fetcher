/// Package
import pkg from '../../package.json';

/// Types
import Imprint from 'src/types/imprint';

const createVersionImprint = (): Imprint => ({
  createdWith: pkg.name,
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
});

export default createVersionImprint;
