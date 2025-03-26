import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const InputField = ({ formik, label, property, children, ...props}) => (
  <FormControl isInvalid={formik.touched?.[property] && formik.errors?.[property]}>
    <FormLabel htmlFor={property}>{label}</FormLabel>
    {children ||
        <Input
          id={property}
          name={property}
          {...formik.getFieldProps(property)}
          {...props}  // Spread other props like type, value, etc.
        />
    }
    <FormErrorMessage>{formik.errors?.[property]}</FormErrorMessage>
  </FormControl>
);


const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit(undefined, values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      type: Yup.string().required("Please select an option"),
      comment: Yup.string().required("Message cannot be empty").min(25, "Must be at least 25 characters"),
    }),
  });

  useEffect(() => {
    if (response) {
      const { type, message } = response;
      if (type === 'success') formik.resetForm();
      onOpen(type, message);
    }
  },[response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contact-me-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form noValidate={true} onSubmit={ formik.handleSubmit }>
            <VStack spacing={4}>
              <InputField formik={formik} property={"firstName"} label={"Name"}/>
              <InputField formik={formik} property={"email"} label={"Email Address"} type={"email"}/>
              <InputField formik={formik} property={"type"} label={"Type of enquiry"}>
                <Select className="custom-select" id="type" name="type" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </InputField>
              <InputField formik={formik} property={"comment"} label={"Your message"} as="textarea" height={250}/>
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
