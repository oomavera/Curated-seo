// Allow JSX to accept the Wistia custom element used by the hosted player
declare namespace JSX {
  interface IntrinsicElements {
    'wistia-player': Record<string, unknown>;
  }
}


