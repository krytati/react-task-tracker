import { render, screen } from '@testing-library/react';
import {FooterButton} from "@/app/Components/FooterButton/FooterButton.tsx";
import Home from "@/app/page.tsx";

describe('test', () => {
    test('should render a component', () => {
        render(<FooterButton selected={true} handler={() => {}}>Test</FooterButton>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('should render main component', () => {
        render(<Home/>);
        expect(screen.getByText('All')).toBeInTheDocument();
    });
})
