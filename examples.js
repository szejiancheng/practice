function symmetric_array(A) {				
    let len = array_length(A) - 1;
    let r = 0;
    for (let i = len; i > 0; i = i - 1) {
        A[r] = A[i];
        r = r + 1;
    }
    return A;
}

function reverse_array(A) {
    let len = array_length(A) - 1;
    let r = 0;
    let b = [];
    for (let i = len; i >= 0; i = i - 1) {
        b[r] = A[i];
        r = r + 1;
    }
    return b;
}

function bubblesort_list (L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let p = L;
        for(let j = 0; j < i; j = j + 1) {
            if(head(p) > head(tail(p))) {
                const temp = head(p);
                set_head(p, head(tail(p)));
                set_head(tail(p), temp);
            }
            p = tail(p);
        } 
    }
    return L;
}


function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        // outer loop to determine the number of swaps for j 
        for (let j = 0; j < i; j = j + 1) {
            if (A[j] > A[j + 1]) {
                // inner loop for swapping
                const temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
    return A;
}        



function transpose_matrix(M) {
    let matrix = [];
    for (let i = 0; i < array_length(M[0]); i = i + 1) {
        let row = [];
        for (let r = 0; r < array_length(M); r = r + 1) {
            row[r] = M[r][i];
        }
        matrix[i] = row;
    }
    return matrix;
}

function rotate_matrix(M) {
    const len = array_length(M);
    for (let i = 0; i < len; i = i + 1) {
        for (let j = 0; j < i; j = j + 1) {
            let temp = M[i][j];
            M[i][j] = M[j][i];
            M[j][i] = temp;
        }
    }
    for(let i = 0; i < len; i = i + 1) {
        M[i] = reverse_array(M[i]);
    }
    return M;
}

function permutations(s) {
    return is_null(s)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x, p),
                         permutations(remove(x, s))),
                s));
}
length(permutations(list(1, 2, 3, 4))); // gives number of permutations

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
    return A;
}


function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//doesn't work
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
    return A;
}

function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}

function remove_duplicates(lst) {
    return is_null(lst)
            ? null
            : pair(head(lst),remove_duplicates(filter(x=>!equal(x,head(lst)),tail(lst))));
}

function inside (a, xs) {
    if (is_null(xs)) {
        return false;
    } else if (equal(a,head(xs))) {
        return true;
    } else {
        return inside(a, tail(xs));
    }
}

function accumulate_array(op, init, A) {
    let final = [];
    
    for(let i = 0; i < array_length(A); i = i + 1) {
        if (i === 0) {
            final = op(init, A[0]);
        } else {
            final = op(final, A[i]);
        }
    }
    return final;
}

function d_filter(pred, xs) {
    if(is_null(xs)) {
        return null;
    } else if (pred(head(xs))) {
        return set_tail(xs,head(xs));
    } else {
        return d_filter(pred,tail(xs));
    }
}

function filter_array(pred, A) {
    let filteredArray = [];
    let r = 0;
    for (let i = 0; i < array_length(A); i = i + 1) {
        if (!pred(A[i])) {
            continue;
        } 
        filteredArray[r] = A[i];
        r = r + 1;
    }
    return filteredArray;
}
// access the 2D array
let mem =[];
function read(n, k) {
    return mem[n] === undefined
        ? undefined
        : mem[n][k];
}

// assigning the value into the 2D array
function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function map_iter (f , xs) {
    function helper (ys, acc) {
        return is_null (ys)
            ? acc
            : helper(tail(ys) , pair(f(head(ys)) , acc));
    }
    return helper(reverse(xs), null);
}
// for arrays
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}
// for arrays
function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;
    while (low <= high) {
        const mid = math_floor((low + high) / 2 );
        if (v === A[mid]) {
        break;
        } else if (v < A[mid]) {
        high = mid - 1;
        } else {
        low = mid + 1;
        }
    }
    return (low <= high);
}









function safe_paths(grid){
    const max_r = length(grid)-1;
    const max_c = length(head(grid))-1;

    function path_finder(row, col){
        if (row === max_r && col === max_c){
            return 1;
        }
        else if (row>max_r||col>max_c||list_ref(list_ref(grid, row), col)>0){
            return 0;
        }else{
            return path_finder(row+1, col) + path_finder(row, col+1);
        }
    }
    return path_finder(0,0);
}
















