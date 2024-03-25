"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";

const Activite = () => {
  const allActivites = [
    "Achat-Revente",
    "Apporteur d'affaires",
    "Artisanat (Création, Réparation, Fabrication)",
    "Bâtiment, Gros oeuvre,Second oeuvre",
    "Beauté, Bien-être, Esotérisme",
    "Conseil, Expertise, Conseil aux entreprises",
    "Cours, formation",
    "Culture, Animation, Sports et Spectacles",
    "Hôtellerie-Restauration, Tourisme",
    "Location d'équipements et de matériel",
    "Mécanique / Technique",
    "Médical / Santé",
    "Services à la personne et aux animaux",
    "Transport / Livraison / Logistique",
    "Web / Informatique / Multimédias",
    "Je ne trouve pas mon domaine d’activité",
  ];

  const currentDate = dayjs();
  const [formValues, setFormValues] = useState<{
    debutActivite: dayjs.Dayjs | null;
    activite: string;
  }>({
    debutActivite: currentDate,
    activite: "",
  });

  const [formErrors, setFormErrors] = useState<{
    debutActivite: string;
    activite: string;
  }>({
    debutActivite: "",
    activite: "",
  });

  const minDate = dayjs().subtract(6, "month");
  const maxDate = dayjs().add(1, "month");

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if ((newValue && newValue < minDate) || (newValue && newValue > maxDate)) {
      setFormErrors({
        ...formErrors,
        debutActivite:
          "La date doit être entre 6 mois avant et 1 mois après la date actuelle.",
      });
    } else {
      setFormErrors({ ...formErrors, debutActivite: "" });
      setFormValues({ ...formValues, debutActivite: newValue });
    }
  };

  const handleChangeActivite = () => {};

  return (
    <>
      <div className="flex justify-between flex-col">
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="debutActivite" className="text-slate-700 text-sm">
            Date de début d&apos;activité
          </label>
          <div className="flex justify-between items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  value={formValues.debutActivite}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  minDate={minDate} // Converti en Date JavaScript
                  maxDate={maxDate} // Converti en Date JavaScript
                  sx={{
                    "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                      padding: "8px !important",
                    },
                    "& .MuiInputBase-root": {
                      border: "0.05px solid #94a3b8",
                      borderRadius: "0.4rem",
                      color: "#64748b",
                      "&:hover": {
                        borderColor: "#64748b",
                      },
                      "&:focus": {
                        borderColor: "#64748b",
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <p className="text-xs w-7/12">
              Entre le {minDate.format("DD/MM/YYYY")} et{" "}
              {maxDate.format("DD/MM/YYYY")}.
            </p>
          </div>
          {formErrors.debutActivite && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.debutActivite}
            </p>
          )}
        </div>
        <div className="w-full w-full mt-5">
          <label htmlFor="activite" className="text-slate-700 text-sm">
            Domaine d&apos;activité
          </label>
          <select
            name="activite"
            id="activite"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
            value={formValues.activite}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                activite: event.target.value,
              })
            }
          >
            <option value="" disabled>
              Sélectionnez votre nouvelle activité
            </option>
            {allActivites.map((activite) => (
              <option key={activite} value={activite}>
                {activite}
              </option>
            ))}
          </select>
          {formErrors.activite && (
            <p className="text-red-500 text-xs mt-1">{formErrors.activite}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Activite;
