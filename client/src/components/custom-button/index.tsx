import React from "react";
import {Button, Form} from "antd";

type Props = {
    children?: React.ReactNode;
    type?: "primary" | "link" | "text" | "default" | "dashed" | undefined;
    htmlType?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    danger?: boolean;
    loading?: boolean;
    shape?: "circle" | "default" | "round" | undefined;
    icon?: React.ReactNode;
};

export const CustomButton = ({
     children,
     type,
     danger,
     loading,
     htmlType = 'button',
     onClick,
     shape,
     icon
 }: Props) => {
    return (
        <Form.Item>
            <Button
                type={type}
                htmlType={htmlType}
                danger={danger}
                loading={loading}
                size="large"
                shape={shape}
                onClick={onClick}
                icon={icon}
            >
                {children}
            </Button>
        </Form.Item>
    );
};