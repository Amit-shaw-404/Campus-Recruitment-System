import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    border:'0px solid black',
    borderRadius:'5px'
  },
  nav: {
    backgroundColor: "#f8f8ff",
    marginBottom: "20px"
  },
  active: {
    backgroundColor: "#fff",
    zIndex: "2"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link:{
    color:'blue',
    fontSize:'15px',
    padding:'5px',
    cursor:'pointer'
  }
}));

export default function SignIn({ flag, setFlag}) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.paper}>
        <Grid container className={classes.nav}>
          <Grid
            item
            xs={6}
            style={{ padding: "15px 0", cursor: "pointer" }}
            className={!flag ? classes.active : null}
          >
            <div
              onClick={() => {
                if (flag) setFlag(!flag);
              }}
            >
              <Typography component="h1" variant="h5" align="center">
                Student
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ padding: "15px 0", cursor: "pointer", borderRadius:'10px' }}
            className={flag ? classes.active : null}
          >
            <div
              onClick={() => {
                if (!flag) setFlag(!flag);
              }}
            >
              <Typography component="h1" variant="h5" align="center">
                Admin
              </Typography>
            </div>
          </Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container style={{margin:'0 0 30px 0'}}>
            <Grid item xs>
              <div className={classes.link}>Forgot password?</div>
            </Grid>
            <Grid item>
              <div className={classes.link}>
                {"Don't have an account? Sign Up"}
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
