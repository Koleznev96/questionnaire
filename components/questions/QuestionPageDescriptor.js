import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import QuestionContainer from './root/QuestionContainer';

import {useFormik} from 'formik';
import * as yup from 'yup';

import QuestionAddress from './QuestionAddress';
import QuestionAgreement from './QuestionAgreement';
import QuestionCanvas from './QuestionCanvas';
import QuestionCity from './QuestionCity';
import QuestionInput from './QuestionInput';
import QuestionPhoto from './QuestionPhoto';
import QuestionPoints from './QuestionPoints';
import QuestionSelect from './QuestionSelect';
import QuestionSelectMulti from './QuestionSelectMulti';
import QuestionSlider from './QuestionSlider';

const components = {
  string: QuestionInput,
  text: props => <QuestionInput {...props} multiline />,
  select: QuestionSelect,
  selectMulti: QuestionSelectMulti,
  agreement: props => <QuestionAgreement {...props} dataProcessing />,
  canvas: QuestionCanvas,
  number: QuestionSlider,
  checkbox: QuestionAgreement,
  points: QuestionPoints,
  city: QuestionCity,
  address: QuestionAddress,
  photo: QuestionPhoto,
};

const QuestionPageDescriptor = props => {
  const validations = {};

  const _initialValuesState = {};

  props.data.items.forEach((item, index) => {
    _initialValuesState[`${index}`] = null;
    validations[`${index}`] = item.options.is_required?yup.string().required():yup.string();
  });

  const [valideForm, setValideForm] = useState(false);

  const validationSchema = yup.object().shape(validations);

  const formik = useFormik({
    initialValues: _initialValuesState,

    validationSchema,

    validateOnMount: false,

    onSubmit: async ({email, password}) => {
      // console.log('onSubmit');
    },
  });

  useEffect(() => {
    let _isValide = true;
    Object.values(formik.values).forEach(item => !item && (_isValide = false));
    setValideForm(_isValide);
  }, [formik.values]);

  return (
    <QuestionContainer
      {...props}
      isValid={valideForm}
      onNext={() => {
        const res = {};

        Object.keys(formik.values).forEach(key => {
          res[props.data.items[key].title] = formik.values[key];
        });

        props.onMassUpdate(res);
      }}>
      {props.data.items.map((item, index) => {
        let ActiveComponent = null;

        if (item.type === 'select') {
          ActiveComponent =
            components[item.options.multiple ? 'selectMulti' : 'select'];
        } else {
          ActiveComponent = components[item.type];
        }
        return (
          <View key={item.title}>
            {ActiveComponent && (
              <ActiveComponent
                pageDesctiptor
                data={item}
                isLight={props.isLight}
                validateOnMount={false}
                formValue={formik.values[`${index}`]}
                defaultValue={
                  props.answers &&
                  props.answers[item.title] &&
                  props.answers[item.title].answer
                }
                onChange={value => {
                  formik.handleChange(`${index}`)(value);
                }}
              />
            )}
          </View>
        );
      })}
    </QuestionContainer>
  );
};

export default QuestionPageDescriptor;
