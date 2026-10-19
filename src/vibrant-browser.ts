
import Vibrant from '@vibrant/core';
import BrowserImage from '@vibrant/image-browser';
import MMCQ from '@vibrant/quantizer-mmcq';
import DefaultGenerator from '@vibrant/generator-default';
import { BasicPipeline } from '@vibrant/core/lib/pipeline';

const pipeline = new BasicPipeline()
  .filter.register('default', (r, g, b, a) => {
    return a >= 125 && !(r > 250 && g > 250 && b > 250);
  })
  .quantizer.register('mmcq', MMCQ)
  .generator.register('default', DefaultGenerator);

Vibrant.DefaultOpts.ImageClass = BrowserImage;
Vibrant.DefaultOpts.quantizer = 'mmcq';
Vibrant.DefaultOpts.generators = ['default'];
Vibrant.DefaultOpts.filters = ['default'];

Vibrant.use(pipeline);

export default Vibrant;
