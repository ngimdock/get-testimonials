import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const SocialSelector = ({
  onSelect,
}: {
  onSelect: (name: string, url: string) => void;
}) => {
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onSubmit = () => {
    if (!name) {
      toast.error("Please enter a name");
      return;
    }

    if (!url) {
      toast.error("Please enter a valid link");
      return;
    }

    if (
      !url.match(/https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/) &&
      !url.match(/https:\/\/twitter\.com\/[a-zA-Z0-9_-]+/) &&
      !url.match(/https:\/\/x\.com\/[a-zA-Z0-9_-]+/)
    ) {
      toast.error("Please enter a valid Linkedin or Twitter link");
      return;
    }

    onSelect(name, url);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ngimdock Zemfack"
          className=" bg-background/50"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.linkedin.com/in/dan/"
          className=" bg-background/50"
        />
        <Button onClick={onSubmit}>
          <Check size={16} className="mr-2" /> submit
        </Button>
      </div>

      <p className="text-sm font-light text-muted-foreground">
        Add a link to your LinkeIn or Twitter
      </p>
    </div>
  );
};
