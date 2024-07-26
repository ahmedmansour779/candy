import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import countriesApi from "../../../api/countriesApi";
import SettingHeader from "../../../components/SettingHeader";
import InputWrapper from "../../../components/UI/InputWrapper";

interface Inputs {
  language: number;
  country: string;
  timezone: string | null;
}

const LocationsAndLanguageTab = () => {
  const { handleSubmit, control, watch, setValue } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        language: yup.string().label("Required"),
        country: yup.string().label("Required"),
        timezone: yup.string().label("Required"),
      })
    ),
    defaultValues: {
      language: 1,
    },
  });

  const country = watch("country");
  // const t = watch("timezone");

  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: () => countriesApi.getCountries(),
  });

  const timezones = useQuery({
    queryKey: ["timezones", country],
    queryFn: () => countriesApi.getTimezone(country),
    enabled: !!country,
  });

  const countriesOptions = countries?.data?.data?.map((country) => ({
    value: country.name.common,
    label: country.name.common,
  }));
  const timezonesOptions = timezones?.data?.data[0]?.timezones?.map(
    (timezone) => ({
      value: timezone,
      label: timezone,
    })
  );
  const onSubmit = (data: Inputs) => {
    data;
  };

  useEffect(() => {
    setValue("timezone", null);
  }, [country, setValue]);

  return (
    <div>
      <SettingHeader title="Location and Language" />
      <Form
        layout="vertical"
        onFinish={() => {
          handleSubmit(onSubmit)();
        }}
      >
        {" "}
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Language"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: 1, label: "English" },
                      { value: 2, label: "France" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Country"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={countriesOptions}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Timezone"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder="Select a timezone"
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={timezonesOptions}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />

          <Flex
            gap={12}
            justify="end"
            className="w-full max-md:flex-col-reverse "
          >
            <Button
              htmlType="submit"
              type="primary"
              className="max-md:w-full h-fit py-2 px-4"
            >
              {" "}
              Save
            </Button>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default LocationsAndLanguageTab;
