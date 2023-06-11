Non tratta variabili
Gli [[8) Logica dei predicati del primo ordine#Connettivi/operatori logici|operatori logici]] sono gli stessi della Logica dei predicati del primo ordine.
La [[8) Logica dei predicati del primo ordine#Teoria assiomatica|Teoria assiomatica]] si applica anche a questa logica.

###### Clausola (generale)
E' una disgiunzione di [[8) Logica dei predicati del primo ordine#Letterale|letterali]] in cui tutte le variabili sono quantificate universalmente in modo implicito: se $a_i$ e $b_j$ sono atomi
$a_1 ∨ a_2 ∨ ... ∨ a_n∨ ∼ b_1∨ ∼ b_2 ∨ ...∨ ∼ b_m$
Ogni fbf della logica proposizionale può essere riscritta come un insieme equivalente di clausole generali, ovvero come somma di prodotti o prodotti di somme.

###### Clausole definite
Clausole nelle quali vi è esattamente un solo letterale positivo: 
$a_1 ∨ ∼ b_1∨ ∼ b_2 ∨ ...∨ ∼ b_m$

###### Clausole di Horn
Clausole con **al massimo** un letterale positivo.
La clausola $A_1 ∨ ... ∨ A_n ∨ ∼B_1 ∨ ... ∨ ∼B_n$ 
equivale a $A_1 ∨ ... ∨ A_n ← B_1 ∧ ... ∧ B_n$
che si può scrivere $A_1, ..., A_n ← B_1 , ...,B_n$


###### Clausola vuota / Contraddizione logica
Clausola nella quale non vi è alcun letterale, ed è indicata con $[\ \ \ ]$

---
---
# Dimostrazioni dei teoremi
Si vogliono dimostrare i teoremi a partire dalla teoria, utilizzando dei metodi (regole di inferenza).

###### Risolvente
Siano
$c_1 = a_1 ∨ ... ∨ a_n$ 
$c_2 = b_1 ∨ ... ∨ b_m$
due clausole *prive di variabili*, dette **clausole parent**.
Se esistono in $c_1$ e $c_2$ due letterali opposti $a_i$ e $b_j$ , ossia tali che $a_i$ =∼ $b_j$ , 
allora si può derivare una nuova clausola $c_3$ detta **clausola risolvente**, della forma:
$c_3$ = $a_1 ∨ ... ∨ a_{i−1} ∨ a_{i+1} ∨ ... ∨ a_n ∨ b_1 ∨ .. ∨ b_{j−1} ∨ b_{j+1} ∨ ... ∨ b_m$
ossia **la clausola risolvente è composta dall'unione (in OR) delle clausole parent, senza i due letterali opposti**.
*$c_3$ è conseguenza logica di $c_1$ ∪ $c_2$.*


# 1. Principio di Risoluzione
[[8) Logica dei predicati del primo ordine#==Correttezza== (soundness)|Corretto]] e [[8) Logica dei predicati del primo ordine#==Completezza== (completeness)|Completo]] per clausole generali.

Sia $f$  una formula da dimostrare, e sia $h$ una teoria, $f$ è un teorema della teoria **se si deriva una contraddizione logica da $h ∪ {∼ f}$**.

Procedimento:
1) Ridurre in forma di clausole $h$ che diventa $h^c$ 
2) Negare $f$ che diventa $∼ f$
   e ridurla in forma di clausole $∼ f$ che diventa $f^c$
2) Applicare iterativamente la riduzione all'insieme $h^c ∪ f^c$
   Se $f$ è un teorema della teoria, la risoluzione deriverà una contraddizione logica in un numero finito di passi, cioè *nella kb comparirà la clausola vuota*. Questo perché ad un certo punto nella kb compariranno due clausole del tipo $a$ e $∼ a$, che applicando su di esse la risoluzione si genera la clausola vuota.
   *Ma a quali coppie di clausole applicare la risoluzione? Il metodo originario (di Robinson) la applica a tutte le coppie possibili dell'insieme di partenza , e aggiunge a tale insieme tutti i risolventi generati. E continua iterativamente ad applicare la risoluzione ad ogni nuovo livello ottenuto, fino a generare, eventualmente, la clausola vuota. Tale algoritmo ha evidentemente una complessità notevole.*

---
# 2. Forward chaining
[[8) Logica dei predicati del primo ordine#==Correttezza== (soundness)|Corretto]] e [[8) Logica dei predicati del primo ordine#==Completezza== (completeness)|Completo]] per clausole di Horn.

Sia una KB formata da solo clausole definite.
L'idea è quella di applicare tutte le regole le cui premesse sono soddisfatte nella kb. Quindi si aggiungono tutte le conclusioni nella kb fino a trovare la query.

---
# 3. Backward chaining
[[8) Logica dei predicati del primo ordine#==Correttezza== (soundness)|Corretto]] e [[8) Logica dei predicati del primo ordine#==Completezza== (completeness)|Completo]] per clausole di Horn.

Sia una KB formata da solo clausole definite.
L'idea è quella di partire dal goal, applicando la risoluzione alle clausole fino ad ottenere la clausola vuota.