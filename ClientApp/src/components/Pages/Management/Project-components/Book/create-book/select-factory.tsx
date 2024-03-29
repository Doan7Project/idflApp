import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
    factories: any;
    onFactorySelect: (selectedFactory: any) => void;
}

export default function SelectFactory({ factories, onFactorySelect }: Props) {
    const [selected, setSelected] = useState(factories[0]);
    const [query, setQuery] = useState("");
    const handleSelectForm = () => {
        return onFactorySelect(selected)
    }

    const filteredFactories =
        query === ""
            ? factories
            : factories.filter((factory: any) =>
                factory.unitName
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
    useEffect(() => {
        if (selected !== null) {

            handleSelectForm();
        }
    }, [selected]);
    return (
        <>
            <div className="inline-block relative w-full">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Choosing factory<span className="text-red-500">*</span>
                </label>
                <Combobox value={selected || ""} onChange={setSelected}>
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden border  bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(factory: any) => factory.unitName}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {filteredFactories.length === 0 && query !== "" ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredFactories.map((factory: any) => (
                                        <Combobox.Option
                                            key={factory.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                                    ? "bg-teal-600 text-white"
                                                    : "text-gray-900"
                                                }`
                                            }
                                            value={factory}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                            }`}
                                                    >
                                                        {factory.unitName}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                                }`}
                                                        >
                                                            <CheckIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        </>
    )
}
