import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "@/components/shared/inputs/InputForm";
import Dropdown from "@/components/shared/inputs/Dropdown";
import Button from "@/components/shared/inputs/Button";
import Card from "@/components/shared/Card";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import { Plus, Star } from "lucide-react";

function AdminManagementLayout({
  title,
  subtitle,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateAction,
  formTitle,
  formSubtitle,
  formIcon: FormIcon,
  schema,
  defaultValues,
  formFields,
  cardKeys,
  apiHooks,
  onDataTransform,
  onSubmitTransform,
}) {
  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({});

  const { request: addItem } = useApi(apiHooks.add);
  const { request: updateItem } = useApi(apiHooks.update);
  const { request: deleteItem } = useApi(apiHooks.delete);
  const { request: fetchData } = useApi(apiHooks.fetch);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetchData();

      const transformedData = onDataTransform
        ? onDataTransform(response)
        : response;
      setDataList(transformedData.list);
      if (transformedData.options) {
        setDropdownOptions(transformedData.options);
      }
    };
    fetchAllData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = onSubmitTransform ? onSubmitTransform(data) : data;

      if (selectedItem) {
        const response = await updateItem(selectedItem.id, payload);
        toast.success(response.message);
        setDataList((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? { ...item, ...payload, ...getItemExtras(payload) }
              : item
          )
        );
        reset(defaultValues);
      } else {
        const response = await addItem(payload);
        toast.success(response.message);
        setDataList((prev) => [
          ...prev,
          { ...response[getResponseKey()], ...getItemExtras(payload) },
        ]);
      }

      reset(defaultValues);
      setSelectedItem(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit");
    }
  };

  const getResponseKey = () => {
    return title.toLowerCase().includes("staff") ? "staff" : "service";
  };

  const getItemExtras = (payload) => {
    if (payload.staff_id && dropdownOptions.staff) {
      return {
        staff: dropdownOptions.staff.find((s) => s.value === payload.staff_id)
          ?.label,
      };
    }
    return {};
  };

  const handleEdit = (item) => {
    const resetData = {};
    Object.keys(defaultValues).forEach((key) => {
      resetData[key] = item[key] || "";
    });
    reset(resetData);
    setSelectedItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success(`${title.split(" ")[0]} deleted successfully`);
      setDataList((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
        reset();
      }
    } catch (error) {
      toast.error(`Failed to delete ${title.split(" ")[0].toLowerCase()}`);
    }
  };

  const renderFormField = (field) => {
    if (field.type === "dropdown") {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: formField }) => (
            <Dropdown
              headLabel={field.headLabel}
              label={field.label}
              options={dropdownOptions[field.optionsKey] || []}
              onSelect={(value) => formField.onChange(Number(value))}
              value={formField.value}
              error={{ message: errors[field.name]?.message || "" }}
              required={field.required}
            />
          )}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: formField }) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <textarea
                {...formField}
                rows={field.rows || 3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          )}
        />
      );
    }

    return (
      <Controller
        key={field.name}
        name={field.name}
        control={control}
        render={({ field: formField }) => (
          <InputForm
            label={field.label}
            id={field.name}
            errors={errors[field.name]}
            field={formField}
            inputType={field.inputType}
          />
        )}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dataList.length}
                </div>
                <div className="text-sm text-gray-500">
                  Total {title.split(" ")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {dataList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {emptyStateTitle}
                </h2>
                <p className="text-gray-600 mb-6">{emptyStateDescription}</p>
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  {emptyStateAction}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataList.map((item) => (
                  <Card
                    key={item.id}
                    data={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    keys={cardKeys}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FormIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedItem
                      ? `Edit ${formTitle}`
                      : `Add New ${formTitle}`}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedItem
                      ? `Update ${formTitle.toLowerCase()} details`
                      : formSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {formFields.map(renderFormField)}

                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  className="w-full h-10 text-gray-600"
                >
                  <Plus className="w-5 h-5" />
                  <span>
                    {selectedItem ? `Update ${formTitle}` : `Add ${formTitle}`}
                  </span>
                </Button>

                {selectedItem && (
                  <Button
                    onClick={() => {
                      setSelectedItem(null);
                      reset();
                    }}
                    className="w-full h-10 text-gray-600"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManagementLayout;
