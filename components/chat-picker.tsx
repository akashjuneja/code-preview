import { LLMModel } from "@/lib/models"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Sparkles } from "lucide-react"
import Image from "next/image";

export const ChatPicker=({models}:{models:LLMModel[]})=>{

    return (
        <div>
            <div className="flex gap-2">
        <Select
          name="languageModel"
          defaultValue={''}
          onValueChange={() => {}}
        >
          <SelectTrigger className="whitespace-nowrap border-none shadow-none px-0 py-0 h-6 text-xs focus:ring-0">
            <SelectValue placeholder="Language model" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center space-x-2">
                      <Image
                        className="flex"
                        src={`/thirdparty/logos/${model.providerId}.svg`}
                        width={14}
                        height={14}
                        alt={model.provider}
                      />
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <Select
          name="languageModel"
          defaultValue={''}
          onValueChange={() => {}}
        >
          <SelectTrigger className="whitespace-nowrap border-none shadow-none px-0 py-0 h-6 text-xs focus:ring-0">
            <SelectValue placeholder="Language model" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center space-x-2">
                      <Image
                        className="flex"
                        src={`/thirdparty/logos/${model.providerId}.svg`}
                        width={14}
                        height={14}
                        alt={model.provider}
                      />
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
        </div>
    )

}