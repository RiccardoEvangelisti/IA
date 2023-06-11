Non tratta variabili
Gli [[8) Logica dei predicati del primo ordine#Connettivi/operatori logici|operatori logici]] sono gli stessi della Logica dei predicati del primo ordine.
La [[8) Logica dei predicati del primo ordine#Teoria assiomatica|Teoria assiomatica]] si applica anche a questa logica.

###### Clausola
E' una disgiunzione di [[8) Logica dei predicati del primo ordine#Letterale|letterali]] in cui tutte le variabili sono quantificate universalmente in modo implicito: se $a_i$ e $b_j$ sono atomi
$a_1 ∨ a_2 ∨ ... ∨ a_n∨ ∼ b_1∨ ∼ b_2 ∨ ...∨ ∼ b_m$
Ogni fbf della logica proposizionale può essere riscritta come un insieme equivalente di clausole generali, ovvero come somma di prodotti o prodotti di somme.

###### Clausole definite
Clausole nelle quali vi è esattamente un solo letterale positivo: 
$a_1 ∨ ∼ b_1∨ ∼ b_2 ∨ ...∨ ∼ b_m$

###### Clausole di Horn
Clausole con **al massimo** un letterale positivo.

###### Clausola vuota / Contraddizione logica
Clausola nella quale non vi è alcun letterale, ed è indicata con $[\ \ \ ]$

---
# Principio di Risoluzione
E' un metodo (regola di inferenza) per dimostrare una teoria nella logica proposizionale.
Sia la KB (teoria) composta da due clausole prive di variabili, dette **clausole parent**:
$c_1 = a_1 ∨ ... ∨ a_n$ 
$c_2 = b_1 ∨ ... ∨ b_m$
se esistono in $c_1$ e $c_2$ due letterali opposti $a_i$ e $b_j$ , ossia tali che $a_i$ =∼ $b_j$ , 
allora si può derivare una nuova clausola $c_3$ detta **clausola risolvente**, della forma:
$c_3$ = $a_1 ∨ ... ∨ a_{i−1} ∨ a_{i+1} ∨ ... ∨ a_n ∨ b_1 ∨ .. ∨ b_{j−1} ∨ b_{j+1} ∨ ... ∨ b_m$
ossia **la clausola risolvente è composta dall'unione (in OR) delle clausole parent, senza i due letterali opposti**.
*$c_3$ è conseguenza logica di $c_1$ ∪ $c_2$.*

## Metodo di dimostrazione dei teoremi con Risoluzione
Si vuole dimostrare un teorema (ossia una formula che deriva dalla teoria) attraverso la Risoluzione.
Data una formula $f$ da dimostrare, e dati tutti gli assiomi $h$ di una teoria, se si deriva una contraddizione logica da h ∪ {∼ f} si dimostra che f è un teorema della teoria.