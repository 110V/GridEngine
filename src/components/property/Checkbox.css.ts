import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';

const container = style({
    display: 'flex',
    gap: '5px',
    justifyContent: 'left',
    alignItems: 'center',

    cursor: 'pointer',
    userSelect: 'none',
});

const box = style({
    display: 'block',
    height: '18px',
    width: '18px',
    backgroundColor: vars.color.brand,

    ":hover": {
        backgroundColor: vars.color.brandLight,
    }
})

const checked = style({
    display: 'block',
    position: 'relative',
    border: 'solid white',
    borderWidth: '0 3px 3px 0',
    left: '29%',
    top: '12%',
    width: '30%',
    height: '45%',
    translate: '-50%, -50%',
    transform: 'rotate(45deg)',
});


const name = style({
    fontFamily: vars.font.body,
    textAlign: 'left',
    color: 'black',
    fontSize: vars.font.medium,
})

const hide = style({
    position: 'absolute',
    cursor: 'pointer',
    opacity: 0,
    height: 0,
    width: 0,
})

export default { hide, name,checked, container, box }
