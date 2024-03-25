import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

const Step = () => {
  return (
    <section className="md:w-4/12 text-slate-700">
      <div className="w-full bg-slate-50 h-max rounded-md py-3 ">
        <div className="px-6 lg:px-8 flex flex-col justify-center items-center">
          <h2 className="font-semibold text-sm text-green-700">
            Numero de dossier
          </h2>
          <h3 className="text-sm">32045393</h3>
        </div>
      </div>
      <div className="px-6 lg:px-8 flex flex-col justify-center items-start w-full flex flex-col mt-7">
        <div className="flex items-center">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border border-green-700">
            <CheckIcon className="h-3 w-3 text-green-700" />
          </div>
          <p className="ml-3 font-semibold text-sm text-green-700">Déclarant</p>
        </div>
        <div className="flex items-center mt-5">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
          <p className="ml-3 text-sm text-slate-400">Activité</p>
        </div>
        <div className="flex items-center mt-5">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
          <p className="ml-3 text-sm text-slate-400">Adresse</p>
        </div>
        <div className="flex items-center mt-5">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
          <p className="ml-3 text-sm text-slate-400">Projet</p>
        </div>
        <div className="flex items-center mt-5">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
          <p className="ml-3 text-sm text-slate-400">Commande</p>
        </div>
        <div className="flex items-center mt-5">
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
          <p className="ml-3 text-sm text-slate-400">Finalisation</p>
        </div>
      </div>
      <div className="px-6 lg:px-8">
        <Accordion
          type="single"
          collapsible
          className="w-full mt-10 text-slate-700"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-start text-sm">
              Pourquoi renseigner toutes ces informations ?
            </AccordionTrigger>
            <AccordionContent className="text-start text-sm">
              Pour être en conformité avec les règles administratives en
              vigueur.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-start text-sm">
              Puis-je modifier mes informations plus tard ?
            </AccordionTrigger>
            <AccordionContent className="text-start text-sm">
              Vous pouvez modifier vos information à n&apos;importe quel moment
              après votre inscription.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-start text-sm">
              Pourquoi ces demarches ?
            </AccordionTrigger>
            <AccordionContent className="text-start text-sm">
              Pour vous assister au cours de votre demande d’immatriculation
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full bg-slate-50 h-max rounded-md py-3 mt-10">
        <div className="px-6 lg:px-8 flex flex-col">
          <h2 className="text-sm">
            <span className="text-green-700 font-semibold">
              +1 051 000 <br />
            </span>{" "}
            auto-entreprises créées en 2023
          </h2>
        </div>
      </div>
      <div className="w-full bg-slate-50 h-max px-6 lg:px-8 rounded-md py-5 mt-5">
        <h2 className="text-sm">Une Question ?</h2>
        <div className="flex relative lign items-center mt-5">
          <PhoneIcon className="h-4 w-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a href="tel:0979797903" className="font-semibold text-sm">
              09 79 79 79 03
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
        <div className="flex relative lign mt-5 items-center">
          <EnvelopeIcon className="h-4 w-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a
              href="mailTo:contact@mon-independant.fr"
              className="font-semibold text-sm "
            >
              contact@mon-independant.fr
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
