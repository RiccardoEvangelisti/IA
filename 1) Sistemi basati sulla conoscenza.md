I linguaggi di programmazione possono essere: 
- Imperativi (C, Python…)
- Ad oggetti (Java, C++) 
- **Dichiarativi** (Prolog) 
- Funzionali (Lisp)

Il programma dichiarativo non è un insieme di istruzioni immutabili che rappresentano la soluzione del problema, ma si impartisce al sistema una base di conoscenza (**Knowledge Base**) che, insieme ad una logica di **controllo**, si permette alla macchina di utilizzare tale conoscenza e risolvere il problema. --> PROGRAMMA = CONOSCENZA + CONTROLLO

L'architettura è composta da:
- **Knowledge Base**: costituita da **fatti**, che rappresentano la conoscenza iniziale sul problema, e **regole**, che collegano i fatti tra di loro.
- **Motore di inferenza**: è il componente che si occupa di elaborare una soluzione ad un dato problema. ^motore-di-inferenza
- **Goal**: è l'obiettivo da raggiungere, il problema da risolvere.

###### Sistemi di produzioni
Programmi che realizzano metodi di ricerca per problemi rappresentati come spazio degli stati. Consistono di:
- Insieme di regole (operatori)
- Una memoria di lavoro (working memory) che contiene gli stati correnti. ^memoria-di-lavoro
- Un interprete (controllo) che seleziona le regole da applicare agli stati della memoria di lavoro, utilizza pattern-matching per la verifica delle precondizioni delle regole e esegue test sul goal se raggiunto.

###### Forward chaining o Data-driven
All'inizio la memoria di lavoro contiene solo i fatti noti.
Le regole applicabili sono quelle in cui l'antecedente può fare matching con i fatti (F-rules), generando nuovi fatti che vengono inseriti nella memoria di lavoro.
Il procedimento termina con successo quando nella memoria di lavoro viene inserito anche il goal da dimostrare (condizione di terminazione).

###### Backward chaining o Goal-driven
All'inizio la memoria di lavoro contiene il/i goal del problema.
Le regole di produzione applicabili sono quelle il cui conseguente può fare matching con la memoria di lavoro (B-rules)., generando nuovi sottogoal da dimostrare che vengono inseriti nella memoria di lavoro.
Il procedimento termina con successo quando nella memoria di lavoro vengono inseriti fatti noti (condizione di terminazione).

###### Ragionamento Bidirezionale o misto
La memoria di lavoro viene suddivisa in due parti, l’una contenente i fatti e l'altra i goals o subgoals.
Si applicano simultaneamente F-rules e B-rules alle due parti di memoria di lavoro e si termina il procedimento con successo quando la parte di memoria di lavoro ricavata mediante backward chaining è uguale o un sottoinsieme di quella ricavata mediante forward chianing (condizione di terminazione).