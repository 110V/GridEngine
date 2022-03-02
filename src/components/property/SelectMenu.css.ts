import { style } from '@vanilla-extract/css';
import { vars } from '@src/GlobalStyles.css';

const container = style({
    fontSize: vars.font.medium,
    fontFamily: vars.font.body,
    textAlign: 'left',
    display: 'inline-flex',
    justifyContent: 'center',
});

const name = style({
    marginRight:"10px",
})

const select = style({
    borderRadius:"0",
    border: 'none',
    paddingTop:"3px",
    paddingBottom:"3px",
    backgroundColor: vars.color.lightGray,
    ":hover":{
        backgroundColor: vars.color.Gray,
    }
})



export default { container,name ,select}
