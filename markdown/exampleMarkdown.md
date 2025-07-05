# **Functions in Python**

**Introduction:**
Functions are blocks of reusable code designed to perform specific tasks. They help organize code, reduce repetition, and enhance readability. Python functions can take inputs, process data, and return results. Functions are essential for structuring programs in a modular and efficient way.


#### **1. Defining Your Own Functions**

**Advanced Explanation:**
In Python, you define a function using the `def` keyword followed by the function name and parentheses `()`. Inside the parentheses, you can specify parameters (if any). The function body contains the code that runs when the function is called.

**Example Code:**

```python
def greet(name):
    """Greets a person by their name."""
    return f"Hello, {name}!"

# Calling the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!
```

**Explanation:**
- The function `greet` is defined with a single parameter `name`.
- The function returns a greeting message that includes the given name.
- The function is called with the argument `"Alice"`, and the output is printed.

---

#### **2. Parameters**

**Advanced Explanation:**
Parameters are the variables listed inside the