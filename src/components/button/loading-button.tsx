import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<"button"> {
    loading?: boolean;
}

export function LoadingButton({ loading = false, ...props }: LoadingButtonProps & VariantProps<typeof buttonVariants> ) {
    return loading ? (
        <Button disabled>
            <Spinner /> Carregando...
        </Button>
    ) : (
        <Button {...props} >{props.children}</Button>
    );
}