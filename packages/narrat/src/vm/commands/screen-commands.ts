import { useScreens } from '@/stores/screens-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const setScreenCommand = new CommandPlugin<{
  screen: string;
  layer?: number;
  transitionName?: string;
  transitionDuration?: number;
  transitionDelay?: number;
}>(
  'set_screen',
  [
    { name: 'screen', type: 'string' },
    { name: 'layer', type: 'number', optional: true },
    { name: 'transitionName', type: 'string', optional: true },
    { name: 'transitionDuration', type: 'number', optional: true },
    { name: 'transitionDelay', type: 'number', optional: true },
  ],
  async (cmd) => {
    const screens = useScreens();
    if (cmd.options.transitionName) {
      return screens.transitionScreen(
        cmd.options.screen,
        {
          transition: cmd.options.transitionName,
          duration: cmd.options.transitionDuration,
          delay: cmd.options.transitionDelay,
        },
        cmd.options.layer,
      );
    } else {
      return screens.setScreen(cmd.options.screen, cmd.options.layer ?? 0);
    }
  },
);

export const emptyLayerCommand = new CommandPlugin<{
  layer: number;
}>('empty_layer', [{ name: 'layer', type: 'number' }], async (cmd) => {
  const screens = useScreens();
  screens.emptyLayer(cmd.options.layer);
});

export const setButtonCommand = new CommandPlugin<{
  buttonId: string;
  state: any;
}>(
  'set_button',
  [
    { name: 'buttonId', type: 'string' },
    { name: 'state', type: 'any' },
  ],
  async (cmd) => {
    const { buttonId, state } = cmd.options;
    const screens = useScreens();
    screens.changeButton(buttonId, state);
  },
);