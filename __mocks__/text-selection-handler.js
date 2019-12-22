import * as textSelectionHandler from '../src/util/text-selection-handler';

global.textSelectionHandler = jest.spyOn(textSelectionHandler, 'default');
