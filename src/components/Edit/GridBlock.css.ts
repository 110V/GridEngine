import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';


const box = style({
    width: '100%',
    height: '100%',
    border: `1px solid ${vars.color.brandDark}`,
});

const none = style({
    backgroundColor: "white",
});

const focus = style({
    backgroundColor: "black",
});

const on = style({
    backgroundColor: vars.color.lightGray,
});


export default {box,none,focus,on};
