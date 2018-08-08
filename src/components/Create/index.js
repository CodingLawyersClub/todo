import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import Form from '../Form';
import FormInput from '../FormInput'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box } from 'rebass';
import { inject, observer } from 'mobx-react'
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import Heading from '../../components/Heading';

const FormSchema = Yup.object().shape({
    text: Yup.string()
        .required('Text for your ToDo is required'),
});

@inject("toDoStore")
@observer
export default class extends Component {
    render () {
        const { isCreatingToDo } = this.props.toDoStore;
        const initalText = { text: '' }

        return (
            <Layout>
                <Container> 
                    <Heading>Create a To-Do!</Heading>      
                    <Formik // A form library that takes care of a lot of magic for us
                    onSubmit={formValues => {
                        this.create(formValues)
                    }}
                    initialValues={initalText} // Defines what the initial text will be, a blank string ('')
                    validationSchema={FormSchema} // Uses our schema we defined above, so 'text' can't be blank
                    render={({ errors, touched, onSubmit }) => ( // Tells it what to draw
                    <Form loading={isCreatingToDo}>
                        <Box>
                            <Box p={10}>
                                <FormInput name="text" placeholder="Clean the basement" type="text" />
                            </Box>
                            <Box p={10}>
                                <Button type="submit">Create</Button>
                            </Box>
                    </Box>
                    </Form>
                    )}
                    />
                </Container>
            </Layout>
        )    
    }

   async create(formValues) {
        await this.props.toDoStore.createToDo(formValues);
        this.props.history.push("/");
    }
}