// typedefs

/**
 * Defines how each Sequence is a {@link MonadType}.
 * @template  _T_
 * @typedef  SequenceMonadType
 * @property { <_U_> (bindFn: (_T_) => SequenceType<_U_>) => SequenceType<_U_> } and
 *              - monadic _bind_,
 *              - example: `Seq(1, 2).and(x => Seq(x, -x)) ['=='] Seq(1, -1, 2, -2)`
 * @property { <_U_> (f:      (_T_) => _U_)               => SequenceType<_U_> } fmap
 *              - functorial _map_,
 *              - example: `Seq(1, 2).fmap(x => x * 2) ['=='] Seq(2, 4)`
 * @property {       (_T_)                                => SequenceType<_T_> } pure
 *              - applicative _pure_,
 *              - example: `Seq().pure(1) ['=='] Seq(1)`
 * @property {       ()                                   => SequenceType<_T_> } empty
 *              - monoidal _empty_
 *              - example: `Seq().empty() ['=='] Seq()`
 *
 */

/**
 * Collection of all {@link SequenceOperation}s that are defined on a {@link SequenceType}.
 * @template  _T_
 * @typedef  SequenceOperationTypes
 * @property { AppendOperationType<_T_> } append
 *              - Type: {@link AppendOperationType}
 *              - append one sequence to another
 *              - Example: `Seq(1).append(Seq(2,3)) ['=='] (Seq(1, 2,3))`
 * @property { AppendOperationType<_T_> } ['++']
 *              - Type: {@link AppendOperationType}
 *              - append one sequence to another, alias for {@link append}
 *              - Example: `Seq(1).append(Seq(2,3)) ['++'] (Seq(1, 2,3))`
 * @property { CatMaybesOperationType<_T_> } catMaybes
 *              - Type: {@link CatMaybesOperationType}
 *              - Sequence of Maybe values to a Sequence of values
 *              - Example: `Seq(Just(1), Nothing, Just(2)).catMaybes() ['=='] (Seq(1, 2))`
 * @property { ConsOperationType<_T_> } cons
 *              - Type: {@link ConsOperationType}
 *              - Prefix with a single value
 *              - Example: `Seq(1, 2).cons(0) ['=='] (Seq(0, 1, 2))`
 * @property { CycleOperationType<_T_> } cycle
 *              - Type: {@link CycleOperationType}
 *              - infinite repetition of the original {@link SequenceType}
 *              - Example: `Seq(1, 2).cycle().take(4) ['=='] (Seq(1, 2, 1, 2))`
 * @property { DropOperationType<_T_> } drop
 *              - Type: {@link DropOperationType}
 *              - return a {@link SequenceType} without the first n elements
 *              - Example: `Seq(1, 2, 3).drop(2) ['=='] (Seq(3))`
 * @property { PipeOperationType<_T_> } pipe
 *              - Type: {@link PipeOperationType}
 *              - Run a series of {@link SequenceOperation}s on a {@link SequenceType}
 *              - example: `Seq(1, 2).pipe(map(x => x * 2), drop(1)) ['=='] (Seq(4))`
 * @property { TakeOperationType<_T_> } take
 *              - Type: {@link TakeOperationType}
 *              - take n elements from a potentially infinite {@link SequenceType}
 *              - example: `Seq(1, 2, 3).take(2) ['=='] (Seq(1,2))`
 */


/**
 * Collection of all terminal operations that are defined on a {@link SequenceType}.
 * @template  _T_
 * @typedef  SequenceTerminalOperationTypes
 * @property { EqualOperationType<_T_> } "=="
 *              - Type: {@link EqualOperationType}
 *              - Check for element-wise equality
 *              - Warning: This only works on finite sequences
 *              - Example: `Seq(1, 2) ['=='] (Seq(1, 2))`
 * @property { EqualOperationType<_T_> } eq$
 *              - Type: {@link EqualOperationType}
 *              - Check for element-wise equality
 *              - Warning: This only works on finite sequences as indicated by the name ending with `$`
 *              - Example: `Seq(1, 2).eq$(Seq(1, 2))`
 * @property { ShowOperationType } show
 *              - Type: {@link ShowOperationType}
 *              - A string representation of the {@link SequenceType} with optionally a maximum amount of elements
 *              - Example: `Seq(1, 2).show() === "[1,2]"`
 * @property { ShowOperationType } toString
 *              - Type: {@link ShowOperationType}, alias for {@link show}
 *              - Note that providing a maximum amount of elements works but is not advised since it will
 *                cause type warnings because it breaks the contract of the inherited `Object.toString()`.
 *                Use {@link show} instead.
 *              - Example: `Seq(1, 2).toString() === "[1,2]"`
 */



/**
 * This type combines the {@link Iterable} with {@link SequenceMonadType}.
 * Objects of this type can therefore be used in [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops,
 * and further syntactical sugar.
 *
 * _Note_: The Kolibri defines many functions of type {@link SequenceOperation} which can be used to
 * transform the elements of this Sequence.
 *
 * @template _T_
 * @typedef {
 *              Iterable<_T_>
 *            & SequenceMonadType<_T_>
 *            & SequenceOperationTypes<_T_>
 *            & SequenceTerminalOperationTypes<_T_>
 * } SequenceType
 */

/**
 * @template _T_
 * @typedef SequenceBuilderType
 * @property { InsertIntoBuilder<_T_> } prepend - adds one or more elements to the beginning of the {@link SequenceBuilderType}
 * @property { InsertIntoBuilder<_T_> } append  - adds one or more elements to the end of the {@link SequenceBuilderType}
 * @property { () => SequenceType<_T_> } build  - starts the built phase and returns an {@link SequenceType} which iterates over the added elements
 */

// callbacks
/**
 * Defines a single operation to decorate an existing {@link SequenceType}.
 *
 * @callback SequenceOperation
 * @template _T_
 * @template _U_
 * @param   { Iterable<_T_>} iterable
 * @returns { SequenceType<_U_>}
 */

/**
 * @callback PipeTransformer
 * @template _T_, _U_
 * @type { SequenceOperation<_T_, _U_> | ((SequenceType) => *)}
 */
/**
 * Pipe applies the given {@link SequenceOperation} to the {@link Iterable} it is called on.
 * @callback Pipe
 * @param { ...SequenceOperation<any,any>} operations
 * @returns { SequenceType<any> }
 */

/**
 * @template _T_
 * @callback ArrayApplierType
 * @param { Array<_T_> } arr
 * @returns any
 */

/**
 * Adds multiple elements to this {@link SequenceBuilderType}.
 * @template _T_
 * @callback InsertIntoBuilder
 * @param   { ...(_T_ | Iterable<_T_>) } args
 * @returns SequenceBuilderType<_T_>
 */
