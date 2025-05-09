import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Stack,
} from '@mui/material';

const SampleForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: '',
      gender: '',
      subscribe: false,
      category: '',
      message: '',
    },
  });

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate>
      <Stack spacing={3}>
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Age Field */}
        <Controller
          name="age"
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]*$/,
              message: 'Age must be a number',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Age"
              variant="outlined"
              fullWidth
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          )}
        />

        {/* Gender Field */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          )}
        />

        {/* Subscribe Checkbox */}
        <Controller
          name="subscribe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Subscribe to newsletter"
            />
          )}
        />

        {/* Category Select */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Category"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="design">Design</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          )}
        />

        {/* Message Field */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SampleForm;