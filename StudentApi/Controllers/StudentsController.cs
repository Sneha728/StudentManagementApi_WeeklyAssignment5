using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;
using System.Threading.Tasks;

namespace StudentApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDbContext _context;
        public StudentsController(StudentDbContext context)
        {
            _context = context;

        }


       //Get all students
        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }


        //get by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound(new { message = "Student not found" });

            return Ok(student);
        }

        //AddStudent
        [HttpPost]
        public async Task<IActionResult> AddStudent(Student stu)
        {
            _context.Students.Add(stu);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Student Added successfully",Student = stu
            });

        }

        //update 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student stu)
        {
            var existing = await _context.Students.FirstOrDefaultAsync(y => y.Id == id);
            if(existing == null) return NotFound();

            existing.Name = stu.Name;
            existing.Class = stu.Class;
            existing.Section = stu.Section;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Student updated", existing });
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var stu = await _context.Students.FirstOrDefaultAsync(s => s.Id == id);
            if(stu == null) return NotFound();

            _context.Students.Remove(stu);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Student deleted" });


        }
    }
}
