import { Disclosure } from '@headlessui/react';
import { DocumentIcon } from '@heroicons/react/outline';
import React, {Fragment, useCallback, useState} from 'react';
import { WhiteButton } from '@/components';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddendumValidationSchema } from './AddendumValidationSchema';
import { CustomFormElement } from '@/components/common';
import { dashboardConstants } from '@/lib';
import { addFsExcludeClass } from '@/lib/utils';

const NewAgreementListRow = ({
  addendumOpened,
  onToggleAddendum,
  agreement,
  onToggleSelect,
  selected,
  addendum,
  md,
  onChangeMd,
}) => {
  const [addendumText, setAddendumText] = useState(addendum);

  const {
    ADDENDUM_NAME,
    ADDENDUM_LABEL
  } = dashboardConstants;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddendumValidationSchema),
  });

  const onToggleAgreement = (e) => {
    setAddendumText('');
    reset({});
    onToggleSelect({ agreement, selected });
  };

  const onChangeAddendumText = (e) => {
    let { value } = e.target;
    setAddendumText(value);
  };

  const onChangeMdText = (e) => {
    onChangeMd({ agreement, md: e.target.value });
  };

  const handleSubmitForm = useCallback(() => {
    onToggleAddendum({ agreement, addendum: addendumText });
  }, [addendumOpened, addendumText]);

  return (
    <li
      className={`bg-white shadow overflow-hidden rounded-md px-1 py-1 ${
        addendumOpened && addendumOpened !== agreement.id ? 'hidden' : ''
      }`}
    >
      <Disclosure>
        {({ open }) => (
          <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="px-1 py-1 flex items-center sm:px-2">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-start">
                <DocumentIcon
                  className="h-6 w-6 text-aptivegreen"
                  aria-hidden="true"
                />
                <div className="flex text-sm ml-4">
                  <p className="font-medium text-gray-800 truncate">
                    {agreement.template_name}
                  </p>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0">
                { agreement.is_addendum || agreement.is_MD ? (
                  <>
                    {agreement.is_addendum && selected ? (
                      <div className="inline-block pr-2">
                        {agreement.is_sent
                          ? (
                            <p className="font-light text-xs text-gray-400 truncate">
                              Sent
                            </p>
                          )
                          : (
                            <WhiteButton
                              selected={selected}
                              text={
                                addendumOpened === agreement.id ? 'Save' : 'Edit'
                              }
                            />
                          )
                        }
                      </div>
                    ) : null}
                    <div onClick={onToggleAgreement} className="inline-block">
                      {agreement.is_sent
                        ? (
                          <p className="font-light text-xs text-gray-400 truncate">
                            Sent
                          </p>
                        )
                        : (
                          <WhiteButton
                            selected={selected}
                            disclosure={true}
                            text={selected ? 'Selected' : 'Select'}
                          />
                        )
                      }
                    </div>
                  </>
                ) : (
                  <>
                  {agreement.is_sent
                      ? (
                        <p className="font-light text-xs text-gray-400 truncate">
                          Sent
                        </p>
                      )
                      : (
                        <WhiteButton
                          selected={selected}
                          text={selected ? 'Selected' : 'Select'}
                          onClick={onToggleAgreement}
                        />
                      )
                  }
                  </>
                )}
              </div>
            </div>
            {((agreement.is_addendum && addendumOpened === agreement.id) ||
              agreement.is_MD) &&
            selected ? (
              <Disclosure.Panel className="border-t h-68 px-2 py-2" static>
                {agreement.is_MD ? (
                  <Fragment>
                    <label
                      htmlFor={`md${agreement.id}`}
                      className="block text-xs font-medium text-gray-700"
                    >
                      MD %
                    </label>
                    <input
                      type="text"
                      id={`md${agreement.id}`}
                      className="max-w-lg shadow-sm block w-full focus:ring-aptivegreen focus:border-aptivegreen sm:text-sm border border-gray-100 rounded-md px-2"
                      onChange={onChangeMdText}
                      value={md || ''}
                    />
                  </Fragment>
                ) : null}
                {agreement.is_addendum ? (
                  <CustomFormElement
                    id={ADDENDUM_NAME + agreement.id}
                    name={ADDENDUM_NAME}
                    label={ADDENDUM_LABEL}
                    type="textArea"
                    formValue={addendumText || ''}
                    onChange={onChangeAddendumText}
                    error={errors?.addendum}
                    required
                    rows={10}
                    register={register}
                    className={addFsExcludeClass()}
                    />
                ) : null}
              </Disclosure.Panel>
            ) : null}
          </form>
        )}
      </Disclosure>
    </li>
  );
};

export default NewAgreementListRow;
