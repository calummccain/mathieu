import numpy as np
import matplotlib.pyplot as plt


def besselj_list(n_max, x):
    n = n_max - 2
    j = [1.0, 0.0]
    scale = 0.0
    x = float(x)

    if x == 0.0:
        return [1] + (n_max - 1) * [0]
    

    else:
        while n >= 0:
            j = [2.0 * float(n + 1) * j[0] / x - j[1]] + j
            if n == 0:
                scale = scale + j[0]
            elif n % 2 == 0:
                scale = scale + 2.0 * j[0]

            n = n - 1

        j = [val / scale for val in j]

        return j

# print(besselj_list(60, 22026.465749406787))

# def besselj(n, x):
#     if x == 0.0:
#         if n == 0:
#             val = 1.0
#         else:
#             val = 0.0
#     else:
#         if x < n ** 2:
#             val = besselj_list(3 * n + 6 * np.ceil(x), x)[n]
#         else:
#             val = np.sqrt(2 / (np.pi * x)) * np.cos(x - (2.0 * np.pi + 1.0) / 4.0)

#     return val

def besselj(n, x):
    if x == 0.0:
        if n == 0:
            val = 1.0
        else:
            val = 0.0
    elif 0.0 < x < np.sqrt(n + 1.0):
        val = ((x / 2.0) ** n) * (1.0 / np.math.factorial(n))
    else:
        val = np.sqrt(2.0 / (np.pi * x)) * np.cos(x - (2.0 * n * np.pi + 1.0) / 4.0)

    return val

# print([besselj(0, float(i) / 10) for i in range(500)])

# t = np.linspace(0.0, 50.0, 400)
# bess = []
# for val in t:
#     bess.append(besselj(2, val))

# print(bess)
# plt.figure()
# plt.plot(t, bess, 'k-')
# plt.grid(True)
# plt.show()
