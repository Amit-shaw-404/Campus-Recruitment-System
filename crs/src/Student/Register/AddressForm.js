import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import axios from 'axios';


export default function AddressForm(props) {

  const [state,setState] = React.useState({
    firstname: "",
    lastName: "",
    contactno: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  const handleChange = (event) => {
    //console.log(event.target.name+" "+event.target.value)
    props.setData({ ...(props.data), [event.target.name]: event.target.value});
  };

  // const handleSubmit = () => {
  //   console.log(state);
  //   axios.post('http://localhost:5000/studentRegister', state)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   })
  // }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            onChange={handleChange}
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            onChange={handleChange}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="contactno"
            name="contactno"
            label="Contact no."
            fullWidth
            onChange={handleChange}
            autoComplete="contact"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            onChange={handleChange}
            autoComplete="address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            onChange={handleChange}
            autoComplete="address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            onChange={handleChange}
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            onChange={handleChange}
            autoComplete="postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            onChange={handleChange}
            autoComplete="country"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveAddress" value="yes" />}
            label="Use this address as contact details"
          />
        </Grid> */}
        {/* <Button 
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Save
        </Button> */}
      </Grid>
    </React.Fragment>
  );
}