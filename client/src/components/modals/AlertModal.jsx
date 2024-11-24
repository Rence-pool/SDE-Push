import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function AlertModal(
  title,
  description,
  continueButton,
  // triggerButton,
  // triggerButtonDisabled,
  // triggerButtonVariant = "outline",
  // triggerButtonClassName = "flex-1",
  // // onButtonTrigger,
  onButtonContinue,
) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
        // variant={triggerButtonVariant}
        // className={triggerButtonClassName}
        // disabled={triggerButtonDisabled}
        >
          Trigger
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onButtonContinue}>
            {continueButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
