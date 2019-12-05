// Test away
import * as rtl from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import { getByTestId, fireEvent } from '@testing-library/react';


test ("<Dashboard /> snapshot", () => {

    const wrapper = rtl.render(<Dashboard />);

    expect(wrapper.asFragment()).toMatchSnapshot();

});

test("initial state displays correctly", () => {

    const { getByTestId } = rtl.render(<Dashboard />);
    const lock = getByTestId('lock');
    const openClosed = getByTestId('open-closed');

    expect(lock.textContent).toBe('Unlocked');
    expect(openClosed.textContent).toBe('Open');

})

test("Toggling State Displays and Updates Correctly", () => {

    const { getByTestId } = rtl.render(<Dashboard />);

    
    fireEvent.click(getByTestId('openButton'));
    fireEvent.click(getByTestId('lockButton'));

    const lock = getByTestId('lock');
    const openClosed = getByTestId('open-closed');

    expect(lock.textContent).toBe('Locked');
    expect(openClosed.textContent).toBe('Closed');
    

});

test("buttons are disabled at the right times", ()=> {

    const { getByTestId } = rtl.render(<Dashboard />);

    const lock = getByTestId('lock');
    const openClosed = getByTestId('open-closed');
    const openButton = getByTestId('openButton');
    const lockButton = getByTestId('lockButton');

    expect(openClosed.className).toBe("led green-led");
    expect(lockButton.disabled).toEqual(true);

    fireEvent.click(getByTestId('openButton'));

    expect(openClosed.className).toBe("led red-led");
    expect(lockButton.disabled).toEqual(false); 

    expect(openButton.disabled).toEqual(false);   
    
    expect(lock.className).toBe("led green-led");

    fireEvent.click(getByTestId('lockButton'));

    expect(openButton.disabled).toEqual(true);  

    expect(lock.className).toBe("led red-led");
})



