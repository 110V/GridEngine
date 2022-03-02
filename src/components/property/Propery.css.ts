import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';

const name = style({
    fontSize: vars.font.large,
    fontFamily: vars.font.body,
});


export default { name }
