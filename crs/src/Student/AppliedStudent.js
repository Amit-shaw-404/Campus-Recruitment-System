import { Button, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
      marginBottom:'10px',
    },
    select:{
        padding:'5px 10px',
        margin:'0 10px',
    }
}));

export default function AppliedStudent(){
    const classes=useStyles();
    return(
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Amit Kumar Shaw"
        subheader="B.Tech 2019-2023"
      />
      <CardContent>
        details
      </CardContent>
      <CardActions disableSpacing>
        <Button>Resume</Button>
        <select className={classes.select}>
            <option>Accept</option>
            <option>Reject</option>
        </select>
      </CardActions>
    </Card>
    );
}