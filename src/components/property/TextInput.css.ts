import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';

const container = style({
    fontSize: vars.font.medium,
    fontFamily: vars.font.body,
    textAlign: 'left',
    display: 'inline-flex',
    justifyContent: 'center',
});

const input = style({
    MozAppearance: 'textfield',
    border: 'none',
    outline: 'none',
    backgroundColor: vars.color.brand,
    width: '60px',
    height: '1.5em',
    paddingLeft: '5px',
    transition: 'background-color 0.1s',
    marginLeft: '10px',
    color:'white',
    ":hover":{
        backgroundColor: vars.color.brandLight,
    },
    ":focus":{
        backgroundColor: vars.color.brand,
    }

})



export default { container,input }
