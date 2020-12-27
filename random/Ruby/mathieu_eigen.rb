def divisible_by_three_or_five?(number)
  (number % 3).zero? || (number % 5).zero?
end
  
sum = 0
(1...10000).each do |i|
  sum += i if divisible_by_three_or_five?(i)
end
  
p sum

def tridiag_det(x, n, q)
  x = x.to_f
  j = 3.0
  a = -x
  b = (4.0 - x) * a - 2.0 * (q ** 2)
  puts x, j, a, b
  while j <= n
    c = ((2.0 * j - 2.0) ** 2 - x) * b - (q ** 2) * a
    a = b
    b = c
    j += 1.0
  end
  return b
end

puts tridiag_det(2, 10, 1)

# def a_even(q, n):

  # q = float(q)    

  # if q == 0.0:
  #     return [4 * i ** 2 for i in range(n // 2)]

  # else:
  #     def tridiag_det(x):
  #         x = float(x)
  #         j = 3.0
  #         a = -x
  #         b = (4.0 - x) * a - 2.0 * (q ** 2)
  #         while j <= n:
  #             c = ((2.0 * j - 2.0) ** 2 - x) * b - (q ** 2) * a
  #             a = b
  #             b = c
  #             j = j + 1.0
  #         return b

  #     roots = []

  #     for j in range(n // 2):
  #         done = False
  #         k = 1
  #         center = interval(2.0 * j, q, 'a')

  #         while not done:
  #             if j != 0:
  #                 rootpot = interval_bisection(tridiag_det, center - k, center + k, 10e-10)
  #             else:
  #                 rootpot = interval_bisection(tridiag_det, center - max([1.0, q]) * k, center + k, 10e-10)
  #             if  rootpot == 'error':
  #                 k = k + 1
  #                 continue
  #             else:
  #                 roots.append(rootpot)
  #                 # print(j, rootpot)
  #                 done = True

  #     return roots