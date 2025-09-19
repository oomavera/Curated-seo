// Allow JSX to accept the Wistia custom element used by the hosted player
declare namespace JSX {
  interface IntrinsicElements {
    'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}


