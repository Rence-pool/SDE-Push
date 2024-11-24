import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
export default function DashboardCards({
  title,
  description,
  content,
  footer,
  ...props
}) {
  return (
    <Card
      className="flex-1 cursor-pointer dark:text-white dark:ring-neutral-800"
      {...props}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex items-center p-2 text-lg font-semibold">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <section>{content}</section>
      </CardContent>
      <CardFooter className="p-2">
        <section>{footer}</section>
      </CardFooter>
    </Card>
  );
}

DashboardCards.propTypes = {
  title: PropTypes.object,
  description: PropTypes.object,
  content: PropTypes.any,
  footer: PropTypes.object,
};
