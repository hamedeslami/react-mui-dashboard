import {Container, Typography} from "@mui/material";

export default function HomePage() {
    return (
        <Container>
            <Typography variant={"h4"}>زیر ساخت اولیه پروژه ری اکت</Typography>
            <Typography variant={"body1"}>تنظیمات اولیه شامل: redux, axios, route  انجام شده است.</Typography>
            <Typography component={'span'}>نسخه 1.0.0</Typography>
        </Container>
    )
}