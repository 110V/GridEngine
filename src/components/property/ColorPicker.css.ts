import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';

const container = style({
    fontSize: vars.font.medium,
    fontFamily: vars.font.body,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const button = style({
    width:'20px',
    height: '20px',
    border: '2px solid black',
    cursor: 'pointer'
})

export default { container, button }
