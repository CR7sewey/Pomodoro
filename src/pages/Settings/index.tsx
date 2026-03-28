import { SaveIcon } from 'lucide-react';
import Container from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import Heading from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { showMessage } from '../../adapter/showMessage';
import useTaskContext from '../../context/useTaskContext';
import type { TaskStateModel } from '../../models/TaskModel';
import { TaskActionTypes } from '../../context/taskReducer';

export function Settings() {

    const workTime = useRef<HTMLInputElement>(null);
    const shortBreakTime = useRef<HTMLInputElement>(null);
    const longBreakTime = useRef<HTMLInputElement>(null);

    const { task, dispatch } = useTaskContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showMessage.dismiss(); // dismiss any existing toasts before showing a new one
        console.log('Work time:', workTime.current?.value);
        console.log('Short break time:', shortBreakTime.current?.value);
        console.log('Long break time:', longBreakTime.current?.value);

        if (!workTime.current || !shortBreakTime.current || !longBreakTime.current) {
            showMessage.error('An error occurred while saving settings. Please try again.');
            return;
        }

        const workTimeValue = parseInt(workTime.current.value);
        const shortBreakTimeValue = parseInt(shortBreakTime.current.value);
        const longBreakTimeValue = parseInt(longBreakTime.current.value);

        if (isNaN(workTimeValue) || isNaN(shortBreakTimeValue) || isNaN(longBreakTimeValue)) {
            showMessage.error('Please enter valid numbers for all time fields.');
            return;
        }

        const formErrors = [];
        if (workTimeValue < 1 || workTimeValue > 99) {
            formErrors.push('Digite valores entre 1 e 99 para foco');
        }

        if (shortBreakTimeValue < 1 || shortBreakTimeValue > 30) {
            formErrors.push('Digite valores entre 1 e 30 para descanso curto');
        }

        if (longBreakTimeValue < 1 || longBreakTimeValue > 60) {
            formErrors.push('Digite valores entre 1 e 60 para descanso longo');
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error);
            });
            return;
        }

        const configs = { workDuration: workTimeValue, shortBreakDuration: shortBreakTimeValue, longBreakDuration: longBreakTimeValue } as TaskStateModel['config'];

        dispatch({
            type: TaskActionTypes.CHANGE_SETTINGS,
            payload: configs,
        });

        showMessage.success('Settings saved successfully!');

    }

    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>

            <Container>
                <p style={{ textAlign: 'center' }}>
                    Modifique as configurações para tempo de foco, descanso curso e
                    descanso longo.
                </p>
            </Container>

            <Container>
                <form action='' className='form' onSubmit={handleSubmit}>
                    <div className='formRow'>
                        <DefaultInput id='workTime' label='Foco' type='text' ref={workTime} defaultValue={task.config.workDuration} />
                    </div>
                    <div className='formRow'>
                        <DefaultInput id='shortBreakTime' label='Descanso curto' type='text' ref={shortBreakTime} defaultValue={task.config.shortBreakDuration} />
                    </div>
                    <div className='formRow'>
                        <DefaultInput id='longBreakTime' label='Descanso longo' type='text' ref={longBreakTime} defaultValue={task.config.longBreakDuration} />
                    </div>
                    <div className='formRow'>
                        <DefaultButton
                            icon={<SaveIcon />}
                            aria-label='Salvar configurações'
                            title='Salvar configurações'
                            type='submit'
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}