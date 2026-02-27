import React from 'react'
import Container from '../../components/Container'
import { MainTemplate } from '../../templates/MainTemplate'
import Heading from '../../components/Heading'
import styles from './styles.module.css'
import {  TrashIcon } from 'lucide-react'
import { DefaultButton } from '../../components/DefaultButton'
import useTaskContext from '../../context/useTaskContext'
import type { TaskStateModel } from '../../models/TaskModel'

export const History = () => {
const {task} = useTaskContext();

  return (
    <MainTemplate>
          <Container>
            <Heading>
            <span>History</span>
            <span className={styles.buttonContainer}>
                {task.tasks.length > 0 && (
                  <DefaultButton
                    icon={<TrashIcon />}
                    color='red'
                    aria-label='Apagar todo o histórico'
                    title='Apagar histórico'
                    onClick={() => {}}
                    />
                )}
            
            </span>
        </Heading>
        </Container>
        <Container>
            
        </Container>
    </MainTemplate>
  )
}
